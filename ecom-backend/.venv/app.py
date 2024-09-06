from flask import Flask, request, jsonify
from pymongo import MongoClient, errors
from flask_cors import CORS
from bson import ObjectId

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


products_collection = db['products']
def serialize_mongo_documents(cursor):
    documents = []
    for doc in cursor:
        doc['_id'] = str(doc['_id']) 
        documents.append(doc)
    return documents
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
            id = str(result.get("_id"))
            access = result.get("access")
            return jsonify({"staus":"success","message":"Userfound","id":id,"access":access}),200
        elif result == None:
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
            id = str(res.inserted_id)
            return jsonify({"status": "success", "message": "New user Registered!","id":id}), 200
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
            id = str(res.inserted_id)
            return jsonify({"status": "success", "message": "New user Registered!","id":id}), 200
        else:
            return jsonify({"status": "error", "message": "Error while inserting into DB"}), 500

    except Exception as e:
        return jsonify({"status": "error", "message": f"Internal Error: {str(e)}"}), 500

@app.route('/add_products', methods=['POST'])
def add_products():
    try:
        data = request.json
        print(data)
        user_id = str(data.get("user_id"))
        if (user_id == "" ):
            return jsonify({"message" : "Invalid request from user"}),500
        userFound = collection.find_one({"_id":ObjectId(user_id)})
        if userFound :
            res = products_collection.insert_one(data)
            if res.acknowledged:
                return jsonify({"message": "Product added successfully"}), 200
            else:
                return jsonify({"message": "Error while inserting"}), 400
    except Exception as e:
        print("ERROR" + str(e))
        return jsonify({"status": "error", "message": f"Internal Error: {str(e)}"}), 500

@app.route('/get_products/<user_id>', methods=['GET'])
def get_products(user_id):
    try:
        if not ObjectId.is_valid(user_id):
            return jsonify({"status": "error", "message": "Invalid user ID format"}), 400
        
        res = products_collection.find({"user_id": user_id})
        data = serialize_mongo_documents(res)

        return jsonify({"message": "products", "data": data}), 200

    except Exception as e:
        print(f"ERROR: {str(e)}")
        return jsonify({"status": "error", "message": f"Internal Error: {str(e)}"}), 500
@app.route('/update_product/<product_id>', methods=['PUT'])
def update_product(product_id):
    try:
        # Get the update data from the request
        data = request.json
        quantity =data.get("quantity")
        if not ObjectId.is_valid(product_id):
            return jsonify({"status": "error", "message": "Invalid product ID format"}), 400

        result = products_collection.find_one_and_update(
            {"_id": ObjectId(product_id)},  # Filter
            {"$set": {"quantity":quantity}},          # Update operation
            return_document=False            # Return the updated document
        )
        if result:
            return jsonify({"status": "success", "message": "Product updated successfully"}), 200
        else:
            return jsonify({"status": "error", "message": "Product not found"}), 404

    except Exception as e:
        print(f"ERROR: {str(e)}")
        return jsonify({"status": "error", "message": f"Internal Error: {str(e)}"}), 500

@app.route('/delete_product/<product_id>', methods=['DELETE'])
def delete_product(product_id):
    try:
        if not ObjectId.is_valid(product_id):
            return jsonify({"status": "error", "message": "Invalid product ID format"}), 400

        # Attempt to delete the product
        result = products_collection.delete_one({"_id": ObjectId(product_id)})

        if result.deleted_count > 0:
            return jsonify({"status": "success", "message": "Product deleted successfully"}), 200
        else:
            return jsonify({"status": "error", "message": "Product not found"}), 404

    except Exception as e:
        print(f"ERROR: {str(e)}")
        return jsonify({"status": "error", "message": f"Internal Error: {str(e)}"}), 500

@app.route('/user_detail/<user_id>', methods=['GET'])
def user_detail(user_id):
    try:
        if(user_id == ""):
            return
        data = collection.find_one({"_id":ObjectId(user_id)})
        print(data)
        data['_id'] = str(data['_id'])
        if(data):
            return jsonify({"message":"User found","data":data}),200
        else:
            return jsonify({"status": "error", "message": "user not found"}), 400

    except Exception as e:
         print(f"ERROR: {str(e)}")
         return jsonify({"status": "error", "message": f"Internal Error: {str(e)}"}), 500

@app.route('/update_user_details/<user_id>',methods=['POST'])
def update_user_details(user_id):
    try:
        if user_id == "":
            return
        update_data = request.json
        findUser = collection.find_one_and_update(
             {"_id": ObjectId(user_id)},  # Filter
            {"$set":update_data},          # Update operation
            return_document=True    
        )
        if findUser :
            findUser['_id'] = str(findUser['_id'])
            return jsonify({"message":"User details updated","Details":findUser}),200
        else:
           return jsonify({"status": "error", "message": "Error while updating db"}), 400
 
    except Exception as e:
         print(f"ERROR: {str(e)}")
         return jsonify({"status": "error", "message": f"Internal Error: {str(e)}"}), 500

if __name__ == '__main__':
    app.run(debug=True)
