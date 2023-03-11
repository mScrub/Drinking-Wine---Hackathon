from django.shortcuts import render
from django.http import JsonResponse
import firebase_admin
from firebase_admin import firestore
# Create your views here.


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
