# te-18login

    "chai": "^4.3.0",
    "mocha": "^8.3.0",
    "nyc": "^15.1.0",
    "supertest": "^6.1.3"
    
"test": "mocha -r dotenv/config --timeout 10000 --exit",
"coverage": "nyc --reporter=html --reporter=text mocha -r dotenv/config --exit --timeout 10000"

