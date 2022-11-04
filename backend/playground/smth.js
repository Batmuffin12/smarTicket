require("dotenv").config();
const bcrypt = require("bcrypt");
const date = () => {
  return Date.now();
};

console.log(date());
const getPass = async () => {
  const usersDb = [
    {
      id: "RM5ZceMwY6ZnSrNAq0xy",
      data: {
        email: "ofek@gmail.com",
        password: "abc112233",
        creditCard: [Object],
        name: "b",
        img: "",
      },
    },
    {
      id: "nQlGlZ53tdJ6uvfPxOyK",
      data: {
        creditCard: [Object],
        password:
          "$2b$10$yA3BEwG.k/VuPxaUD/6hgObF7S6dduQqNa3Xd25IKvwJJZaZvIpCW",
        email: "ofekben1@gmail.com",
        token:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im9mZWtiZW4xQGdtYWlsLmNvbSIsImlhdCI6MTY2NzU1Nzk0OH0.dZaYbuP76lIusHXhGQTE5owZYLRacmwseebv2CHSI8I",
      },
    },
    {
      id: "oCD0btImu4CLLvKnUg7u",
      data: {
        creditCard: [Object],
        token:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im9mZWtiZW4xMkBnbWFpbC5jb20iLCJpYXQiOjE2Njc1MTUzODl9.dN5xm3INdy1hGhKj5DX3R1b73mX4IJr2a9bplyW2jR0",
        email: "ofekben12@gmail.com",
        password:
          "$2b$10$nv6A0/O6GubFngwa2Tpr3elYZ/Is4cv9bNchuJ2MYxYos50AGnu8C",
      },
    },
    {
      id: "pcCEQ0UfJaKHW1RpfJs3",
      data: {
        token:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im9mZWtiZW4xMjNAZ21haWwuY29tIiwiaWF0IjoxNjY3NTU3NDk3fQ.SD1JI8pEtBPOSz_ASoGSz4gkkDUZRzYlpru1GGFF4J0",
        email: "ofekben123@gmail.com",
        creditCard: [Object],
        password:
          "$2b$10$rll85Ml8/StWJGM2VRoDq.Ld2m2j4x3IzF9xiYYJxUYqlqMk7LPFO",
      },
    },
  ];
  console.log(Array.isArray(usersDb));
  const check = usersDb.find(async (user) => {
    const validPass = await bcrypt.compare("Abg112233", user.data.password);
    return validPass && user.data.email === "ofekben123@gmail.com";
  });
  console.log(check);
};
getPass();
module.exports = date;
