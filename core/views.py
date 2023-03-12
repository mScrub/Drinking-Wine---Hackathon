from django.shortcuts import render
from django.http import JsonResponse
from firebase_admin import firestore, auth
# Create your views here.
import json
from django.views.decorators.csrf import csrf_exempt
import requests
import openai
import subprocess
from DrinkingWine import config
openai.api_key = config.OPENAI_API_KEY


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
            request.session["uid"] = user.uid
            request.session.save()
            print(request.session["uid"])
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
    if request.session.get("uid") is not None:
        return JsonResponse({"success": True})
    else:
        return JsonResponse({"success": False})


@csrf_exempt
def get_chatgpt_response(request):
    if request.method == "POST":
        data = json.loads(request.body)
        messages = data.get("messages")
        print(messages)
        if len(messages) == 0:
            position = data.get("position")
            ambiance = data.get("ambiance")
            start_message = {
                "role": "user",
                "content": "Let the interview begin."
            }
            initial_message = {
                "role": "system",
                "content": f"You are an interviewer for a {position} position. Make this interview {ambiance} for the interviewee. Respond to all input in less than 25 words or less",
            }
            messages.append(initial_message)
            messages.append(start_message)
        else:
            text = data.get("text")
            new_message = {
                "role": "user",
                "content": text
            }
            messages.append(new_message)
        chatgpt_response = openai.ChatCompletion.create(
            model="gpt-3.5-turbo", messages=messages)
        return JsonResponse({"response": chatgpt_response})
    else:
        return JsonResponse({"error": "Invalid request method"})
