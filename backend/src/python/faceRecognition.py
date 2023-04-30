# import tensorflow as tf
# import base64
# import sys
# import cv2
# import numpy as np
# from PIL import Image
# from io import BytesIO
# from mtcnn.mtcnn import MTCNN
# from keras_facenet import FaceNet

# import os
# os.environ['TF_CPP_MIN_LOG_LEVEL'] = '3'

# tf.compat.v1.logging.set_verbosity(tf.compat.v1.logging.ERROR)


# # Initialize the MTCNN face detector and FaceNet model
# detector = MTCNN()
# facenet = FaceNet()


# def detect_faces(image):
#     # Load the Haar Cascade classifier
#     face_cascade = cv2.CascadeClassifier(
#         cv2.data.haarcascades + "haarcascade_frontalface_default.xml")

#     # Convert the image to grayscale
#     gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)

#     # Detect faces
#     faces = face_cascade.detectMultiScale(
#         gray, scaleFactor=1.1, minNeighbors=5, minSize=(30, 30))

#     # Check if any faces are detected
#     if len(faces) == 0:
#         return None

#     # Get the coordinates of the first face detected
#     (x, y, w, h) = faces[0]

#     # Crop the face from the image
#     face_img = image[y:y+h, x:x+w]

#     return face_img


# def process_image(base64_str):
#     nparr = np.frombuffer(base64.b64decode(base64_str), np.uint8)
#     img_np = cv2.imdecode(nparr, cv2.IMREAD_COLOR)
#     face_img = detect_faces(img_np)
#     if face_img is None:
#         print("No faces detected")
#         return None
#     else:
#         face_img = cv2.resize(face_img, (160, 160))
#         face_img = face_img.astype("float32")
#         face_img = np.expand_dims(face_img, axis=0)
#         embedding = facenet.embeddings(face_img)
#         print("embedding: ", embedding)
#         return embedding


# if __name__ == "__main__":
#     base64_str = sys.stdin.readline().strip()
#     process_image(base64_str)
        
import os
import sys
import base64
import numpy as np
from io import BytesIO
from PIL import Image
import tensorflow as tf
import cv2
from tensorflow.keras.models import load_model


def preprocess_image(base64_image):
    img_data = base64.b64decode(base64_image)
    img = Image.open(BytesIO(img_data)).convert("RGB")
    img_array = np.array(img)
    return img_array


def load_facenet_model():
    script_dir = os.path.dirname(os.path.realpath(__file__))
    model_path = os.path.join(script_dir, "models", "facenet_keras.h5")
    model = load_model(model_path)
    return model


def detect_faces(image, net, conf_threshold=0.7):
    blob = cv2.dnn.blobFromImage(image, 1.0, (300, 300), [104, 117, 123], False, False)
    net.setInput(blob)
    detections = net.forward()
    faces = []
    for i in range(detections.shape[2]):
        confidence = detections[0, 0, i, 2]
        if confidence > conf_threshold:
            x1 = int(detections[0, 0, i, 3] * image.shape[1])
            y1 = int(detections[0, 0, i, 4] * image.shape[0])
            x2 = int(detections[0, 0, i, 5] * image.shape[1])
            y2 = int(detections[0, 0, i, 6] * image.shape[0])
            faces.append([x1, y1, x2 - x1, y2 - y1])
    return faces


def get_face_embeddings(base64_image, face_detector, facenet_model):
    img_array = preprocess_image(base64_image)

    # Detect faces using OpenCV DNN
    faces = detect_faces(img_array, face_detector)

    if len(faces) == 0:
        return np.array([])

    x, y, width, height = faces[0]
    face = img_array[y:y+height, x:x+width]
    face = Image.fromarray(face).resize((160, 160))
    face = np.array(face) / 255.0
    face = np.expand_dims(face, axis=0)

    embeddings = facenet_model.predict(face)

    return embeddings[0]


# Initialize the face detector and Facenet model
script_dir = os.path.dirname(os.path.realpath(__file__))
prototxt_path = os.path.join(script_dir, "models", "deploy.prototxt.txt")
caffemodel_path = os.path.join(script_dir, "models", "res10_300x300_ssd_iter_140000.caffemodel")
face_detector = cv2.dnn.readNetFromCaffe(prototxt_path, caffemodel_path)
facenet_model = load_facenet_model()

# Example usage
base64_image = sys.stdin.readline().strip()
face_embeddings = get_face_embeddings(base64_image, face_detector, facenet_model)

if face_embeddings.size > 0:
    print("Face embeddings:", face_embeddings)
else:
    print("No face detected.")
