from flask import Flask, jsonify, request
from google import genai
import os
#from dotenv import load_dotenv

app = Flask(__name__)
messages = []

# Gemini Configuration
client = genai.Client()

def get_gemini_response(message):
   try:
       response = client.models.generate_content(
            model="gemini-2.5-flash", contents=message
       )
       return response.text
   except Exception as e:
       raise ValueError(f"Error communicating with Gemini: {str(e)}")

@app.route('/', methods=['GET'])
def home():
    return jsonify({"message": "Server is running"}), 200

@app.route('/chatbot/chat', methods=['GET', 'POST'])
def chat():
   if request.method == 'POST':
       message = request.json.get('message', '')

       if message:
           try:
               answer = get_gemini_response(message)
               messages.extend([
                   {"is_user": True, "q": message},
                   {"is_user": False, "a": answer}
               ])
            
           except Exception as e:
               app.logger.error(f"Error in chat route: {str(e)}")
               return jsonify({"error": "Error occured with request", "errorType": str(e)}), 400
           
           return jsonify({"Message": messages}), 200
    
   return jsonify({"error": "Error getting AI response"}), 400


if __name__ == '__main__':
    app.run(debug=True)