from flask import Flask, request, jsonify
from pymongo import MongoClient, errors
from flask_cors import CORS # type: ignore
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
@app.route('/get_all_products/<category>',methods=['GET'])
def get_all_products(category):
    try:
        data = products_collection.find({"category": category })
        docs = serialize_mongo_documents(data)
        if docs:
            return jsonify({"message":"Data fetched successffuly","data":docs}),200
        else:
            return jsonify({"message":"No products found","data":docs}),400
    except Exception as e :
         print(f"ERROR: {str(e)}")
         return jsonify({"status": "error", "message": f"Internal Error: {str(e)}"}), 500
  
@app.route('/get_product_details/<product_id>',methods=['GET'])
def get_product_details(product_id):
    try:
        if product_id == "":
            return jsonify({"error":"Product id is undefined"}), 404
        res = products_collection.find_one({'_id':ObjectId(product_id)})
        if res != "":
            res['_id'] = str(res['_id'])
            return jsonify({"message":"Details retrived","data":res}), 200
        else:
            return jsonify({"error":"Product Not found in db"}), 404
    except Exception as e:
         print(f"ERROR: {str(e)}")
         return jsonify({"status": "error", "message": f"Internal Error: {str(e)}"}), 500

@app.route('/add_to_wishlist/<id>', methods=['POST'])
def add_to_wishlist(id):
    try:
        data = request.json
        product_details = data.get("details")
        
        if not id or not product_details:
            return jsonify({"error": "User ID or product details missing"}), 400

        # Find user and get only the wishList field
        user = collection.find_one({'_id': ObjectId(id)}, {"wishList": 1})
        
        if not user:
            return jsonify({"error": "User not found"}), 404
        
        wishlist_arr = user.get("wishList", [])
        
        if isinstance(wishlist_arr, list):
            # Check if the product is already in the wishlist
            if product_details in wishlist_arr:
                return jsonify({"message": "Product already in wishlist"}), 200

            # Push the new product details to the wishlist array
            result = collection.update_one(
                {'_id': ObjectId(id)},
                {"$push": {'wishList': product_details}}
            )

            if result.modified_count > 0:
                return jsonify({"message": "Added to wishlist"}), 200
            else:
                return jsonify({"message": "Failed to add to wishlist"}), 500
        else:
            return jsonify({"error": "Wishlist is not in a valid format"}), 400
    except Exception as e:
        print(f"ERROR: {str(e)}")
        return jsonify({"status": "error", "message": f"Internal Error: {str(e)}"}), 500

@app.route('/get_user_wishlist/<user_id>',methods=['GET'])
def get_user_wishlist(user_id):
    try:
        wishlist =[]
        find_user = collection.find_one({'_id':ObjectId(user_id)}, {'_id': 0, 'wishList': 1})
        if find_user != "":
            product_ids = find_user.get("wishList")
            for id in product_ids:
                find_products = products_collection.find_one({'_id':ObjectId(id)})
                find_products['_id'] = str(find_products['_id'])
                wishlist.append(find_products)
            return jsonify({"status": "success", "message":"Data","data":wishlist}), 200
        else:
            return jsonify({"error":"Error while finding the wishlist"}),400

    except Exception as e:
          print(f"ERROR: {str(e)}")
          return jsonify({"status": "error", "message": f"Internal Error: {str(e)}"}), 500

@app.route('/remove_from_wishlist/<id>', methods=['POST'])
def remove_from_wishlist(id):
    try:
        data = request.json
        product_details = data.get("details")

        if not id or not product_details:
            return jsonify({"error": "User ID or product details missing"}), 400

        # Find user and get only the wishList field
        user = collection.find_one({'_id': ObjectId(id)}, {"wishList": 1})

        if not user:
            return jsonify({"error": "User not found"}), 404

        wishlist_arr = user.get("wishList", [])

        if isinstance(wishlist_arr, list):
            # Check if the product is in the wishlist
            if product_details not in wishlist_arr:
                return jsonify({"message": "Product not found in wishlist"}), 404

            # Pull the product details from the wishlist array
            result = collection.update_one(
                {'_id': ObjectId(id)},
                {"$pull": {'wishList': product_details}}
            )

            if result.modified_count > 0:
                return jsonify({"message": "Removed from wishlist"}), 200
            else:
                return jsonify({"message": "Failed to remove from wishlist"}), 500
        else:
            return jsonify({"error": "Wishlist is not in a valid format"}), 400
    except Exception as e:
        print(f"ERROR: {str(e)}")
        return jsonify({"status": "error", "message": f"Internal Error: {str(e)}"}), 500
@app.route('/searchPage/<query>',methods=['GET'])
def searchPage(query):
    try:
        query = str(query)
        if not query:
            return jsonify({"error": "Search query is missing"}), 400

        # Define the search criteria with regex for case-insensitive matching
        search_criteria = {
            "$or": [
                {"productName": {"$regex": query, "$options": "i"}},
                {"category": {"$regex": query, "$options": "i"}},
                {"description": {"$regex": query, "$options": "i"}}
            ]
        }

        # Perform the search in the 'product_collection'
        search_results = list(products_collection.find(search_criteria))

        # If no products found, return an appropriate message
        if not search_results:
            return jsonify({"message": "No products found"}), 404

        # Convert ObjectId to string and return search results
        for product in search_results:
            product['_id'] = str(product['_id'])

        return jsonify({"products": search_results}), 200

    except Exception as e:
        print(f"ERROR: {str(e)}")
        return jsonify({"status": "error", "message": f"Internal Error: {str(e)}"}), 500
@app.route('/get_recommended/<id>',methods=['POST'])
def get_recommended(id):
    try:
        category = request.json
        category = category.get("category")
        wishlist =[]
        category_list =[]
        find_user = collection.find_one({'_id':ObjectId(id)}, {'_id': 0, 'wishList': 1})
        if find_user != "":
            product_ids = find_user.get("wishList")
            if product_ids !="":
                for ids in product_ids:
                    find_products = products_collection.find_one({'_id':ObjectId(ids)})
                    find_products['_id'] = str(find_products['_id'])
                    wishlist.append(find_products)
        if category !="":
            for category_name in category:
                data = products_collection.find({"category": category_name }).limit(10)
                docs = serialize_mongo_documents(data)
                category_list.extend(docs) 

        return jsonify({"message":"success","catgeory":category_list,"wishlist":wishlist}),200
    except Exception as  e :
         print(f"ERROR: {str(e)}")
         return jsonify({"status": "error", "message": f"Internal Error: {str(e)}"}), 500

if __name__ == '__main__':
    app.run(debug=True)
