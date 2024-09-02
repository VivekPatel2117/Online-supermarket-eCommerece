from flask import Flask, request, jsonify
from pymongo import MongoClient, errors
from flask_cors import CORS
app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "http://localhost:5173"}})

try:
    # Attempt to connect to MongoDB
    client = MongoClient("mongodb://localhost:27017/", serverSelectionTimeoutMS=5000)
    
    # Try to ping the server to confirm connection
    # Select the database and collection
    db = client["freshmart"]
    collection = db["users"]
    client.admin.command('ping')
    server = client.server_info()

    print("Successfully connected to MongoDB")

except errors.ServerSelectionTimeoutError as err:
    # Handle error if unable to connect to MongoDB
    print(f"Failed to connect to MongoDB: {err}")

# Define your routes here
# @app.route('/register', methods=['POST'])
# def register():
#     try:
#         data = request.json
#         result = collection.insert_one(data)
#         return jsonify({"status": "success", "inserted_id": str(result.inserted_id)}), 201
#     except Exception as e:
#         return jsonify({"status": "error", "message": str(e)}), 500


@app.route("/")
def hello_world():
    result = collection.find()
    names = []
    for i in result:
        name = i.get('name')
        names.append(name)
    return f"<p>Hello, {names[0]}!</p>"

@app.route("/login",methods = ['POST'])
def login():
    try:
        data = request.json
        username = data.get("username")
        password = data.get("password")
        result = collection.find_one({"username":username,"password":password})
        if result and result.get("username") == username and result.get("password") == password:
            print("TRUE")
            return jsonify({"staus":"success","message":"Userfound"}),200
        elif result == None:
            print("FALSE")
            return jsonify({"staus":"error","message":"user not found"}),400

    except Exception as e:
        return jsonify({"status": "error", "message": f"Internal Error${str(e)}"}), 500

@app.route("/buyerRegister", methods=['POST'])
def buyerRegister():
    try:
        data = request.json
        username = data.get("username")
        email = data.get("email")
        phone = data.get("phone")
        existing_user = collection.find_one({"$or": [{"username": username}, {"email": email}, {"phone": phone}]})

        if existing_user:
            return jsonify({"status": "error", "message": "User already exists"}), 409

        res = collection.insert_one(data)

        if res.acknowledged:
            return jsonify({"status": "success", "message": "New user Registered!"}), 200
        else:
            return jsonify({"status": "error", "message": "Error while inserting into DB"}), 500

    except Exception as e:
        return jsonify({"status": "error", "message": f"Internal Error: {str(e)}"}), 500

@app.route("/sellerRegister", methods=['POST'])
def sellerRegister():
    try:
        data = request.json
        username = data.get("username")
        email = data.get("email")
        phone = data.get("phone")
        existing_user = collection.find_one({"$or": [{"username": username}, {"email": email}, {"phone": phone}]})

        if existing_user:
            return jsonify({"status": "error", "message": "User already exists"}), 409

        res = collection.insert_one(data)

        if res.acknowledged:
            return jsonify({"status": "success", "message": "New user Registered!"}), 200
        else:
            return jsonify({"status": "error", "message": "Error while inserting into DB"}), 500

    except Exception as e:
        return jsonify({"status": "error", "message": f"Internal Error: {str(e)}"}), 500

if __name__ == '__main__':
    app.run(debug=True)
