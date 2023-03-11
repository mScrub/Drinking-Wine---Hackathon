from django.shortcuts import render
from django.http import JsonResponse
import firebase_admin
from firebase_admin import firestore, auth
# Create your views here.
import json
from django.views.decorators.csrf import csrf_exempt




def front(request):
    context = {}
    return render(request, "index.html", context)

def users(request):
    database = firestore.client()
    user_collection = database.collection("users")
    docs = user_collection.get()
    data = [doc.to_dict() for doc in docs]
    context = {}
    return JsonResponse({"data": data})

@csrf_exempt
def create_user(request):
    if request.method == "POST":
        data = json.loads(request.body)
        user_email = data["email"]
        user_password = data["password"]
        try:
            user = auth.create_user(
                email = user_email,
                password = user_password
            )
            return user.uid
        except:
            return JsonResponse({"error": [user_email, user_password]})
        
