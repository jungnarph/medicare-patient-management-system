// Import required modules
const admin = require('firebase-admin');

// Initialize Firebase Admin SDK
admin.initializeApp({
    credential: admin.credential.cert({
        type: "service_account",
        project_id: "sia-mediacare",
        private_key_id: "1799c9ce745fd7ea6aecd18f90c06f798da83a43",
        private_key: "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQDTgH/5jOzLAFFR\n6T97l53oA4xofG45wxOxLbtebHB4MIJr9G7H8AX/1C/CFMqvxMYrbXbNbHFhl2yd\nHVcCR7onJSS/snnun63cXVbLsxUkRM/7BM2+gcLPFFUVXby/fIIBwcfRQUmnJha7\n1AAOnjLyAT7ZQw+OHZjV/zwaJosUkNpiRh9tUlCFJlI6836Ae0peSUc8+8wGbKBI\nptKDvXDdAY2omih4t3iJfXqfb6OGVqB9lij9dhvr6KOPq6nfxxd2z9aSvOonEpaD\nB5G2VZ3uvY1H0EGa1DXU+NLQl2x0jMhJPJ9Sx4vLkUEqMlB1q5moxHtHGgcjYzhb\nwhbrNgT5AgMBAAECggEAL6CSMPoBIL2TkmR5/TTpRCP4bFcI400AlDd+KAc3VHlo\nBTNn9vIgB7oafxP7iJVBIuplhGDVL2rP9Jl0zHimfMYqfliMiKXAmw0RzJEpQ5+T\nTi2Iv0utOMCVYFhZdq1tAURH4OFY2qEDIYzd7mzFgCWzp20ohZI4pofxWtovG5QR\n057egXVavC/yCPTqVu8jStiwHZyATyCs3XOFQG4OW7Lx32YOg8FO94zpXYwVIrF+\niRhvRUgl0/00vI92Epq3FfDQNtBEVWvZhZgHxOIrU02oovsLy51bvj6ywKqXfWwn\nkN8p0qqWIVbPh23f0tDM1tmQzijcPc8K1P+3LBqhYQKBgQD8ejP1yVYqYTjrgepc\nP6KeE8+zON/2EEg/OW9yBxcU7RhIISgzbwwZOgytkEfgx3HEzYYJkkgvWhWqAyCh\nJaH61ioMY4qkuBAhKwq4VDf/v7DZiD6RKnzZQ/7ug/REYm6RLh9vb4KhHef4FdpU\nmzQjcmHZaXLUG5N6sGBKrTRBVQKBgQDWc/D1j4S7bra4nhAMx+pczzX6vKpAi4Nn\nTU9oMIuY3MXSnqfw6Z25tJuPyIej9aDxSpGpBCawTjB+orViIUYTWmVcsxdLecLi\nZMMzSrLu45M+KZi368s2evA61biPNoRnYX5ZqUFdPHEIcTFQY2yKGP5FcsUHRV6P\noY3spg4FFQKBgQDdZlQ2Tu4uj78YVn6rkmoJ8RmL8m4DG1gfiUA/YBRPl3JZning\noJqdbJg9g25koMEVcZz+u7ZtP7QLuF5esd+PVUrePlQQChCq5VGrPr80mGZ++8jS\nB84fwE7H3hLP/Pk0epu6XrDQlKccmB0zYD6ibuV7f8rgUaZMSmrGUYinWQKBgEO9\n8BnBsi369SEwXOWMqQ2ULvr7adRlvaZ+F11UKGSrKJo1n9tMEJS+5nzu3Vn/l01h\nPs3jD82VhWAbSayr0hT+8xHrSKqA1fzp03d6Wzd3D+YNAb7nbxPQld4f8OLcV8rI\nUz9DZfBrzVDbYLaCEaE17+xEKtT3Jr28TLa6ZadZAoGAeKTiucKvdPJIB85iYC5y\nFqN0Qq6jGfo9s/8JyOHgjgsTnBO1krcn2vVCqwMpnhxHECPUPioyiIplWf/RPuHA\nrpOOwqwcMDktrx6vMwDH3oNLTlXCDVRknP+i78gVoWQvZscjUPO42Y6dP7AdfgLg\nFh56gu0cVzolucc1VsWtj4s=\n-----END PRIVATE KEY-----\n",
        client_email: "firebase-adminsdk-v4drr@sia-mediacare.iam.gserviceaccount.com",
        client_id: "113357760963481188699",
        auth_uri: "https://accounts.google.com/o/oauth2/auth",
        token_uri: "https://oauth2.googleapis.com/token",
        auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
        client_x509_cert_url: "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-v4drr%40sia-mediacare.iam.gserviceaccount.com",
        universe_domain: "googleapis.com"
    }),
    databaseURL: "https://sia-mediacare-default-rtdb.firebaseio.com/"
});

// Reference to the Firebase Realtime Database
const database = admin.database();

exports.handler = async (event) => {
    try {
        console.log("Received event body:", event.body);
        
        // Dynamically extract data from the event object (assuming data is passed in the event body)
        const { userId, username, email, age } = JSON.parse(event.body);  // Parse the data from the event body

        if(!userId || !username || !email || !age) {
            return {
                statusCode: 400,
                body: JSON.stringify({ error: "Missing required data" })
            };
        }

        //update firebase
        const userRef = database.ref(`users/${userId}`);
        const newRef = await userRef.update({
            username: username, 
            email: email,
            age: age
        });
        // Return the response
        return {
            statusCode: 200,
            body: JSON.stringify({
                message: "Updated Succesfully",
            })
        };
    } catch (error) {
        console.error("Error updating data:", error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: "Failed to udpate data" })
        };
    }
};
