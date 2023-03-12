from django.shortcuts import render
from django.http import JsonResponse
import firebase_admin
from firebase_admin import firestore, auth
# Create your views here.
import json
from django.views.decorators.csrf import csrf_exempt
import requests

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
    if request.method == 'POST':
        data = json.loads(request.body)
        email = data.get('email')
        password = data.get('password')
        try:
            user = auth.create_user(email=email, password=password)
            print(user.uid)
            return JsonResponse({'success': True, 'user': user})
        except Exception as e:
            return JsonResponse({'success': False, 'message': str(e)})
    else:
        return JsonResponse({'error': 'Invalid request method'})
    
@csrf_exempt
def login(request):
    data = json.loads(request.body)
    email = data.get("email")
    password = data.get("password")
    response = requests.post(
        'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBWSuiVJJm7Y8hgAwQUljezZLhvfoWrVLw',
        data=json.dumps({
            'email': email,
            'password': password,
            'returnSecureToken': True
        }),
        headers={'Content-Type': 'application/json'}, timeout=20
    )

    if response.status_code == 200:
        response_data = response.json()
        USER_UID = response_data["localId"]
        request.session["uid"] = USER_UID
        request.session.save()
        return JsonResponse({"success": True, "id": USER_UID})
    else:
        return JsonResponse({"error": "there was an error"})

@csrf_exempt
def writing(request):
    data = json.loads(request.body)
    name = data.get("name")
    database = firestore.client()
    user_collection = database.collection("users")
    user_collection.document(name).set({
        "name": name
    })
    return JsonResponse({"stuff": request.session.get("uid")})

@csrf_exempt
def is_logged_in(request):
    return request.session["uid"] is not None