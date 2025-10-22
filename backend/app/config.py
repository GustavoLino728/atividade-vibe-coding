import os
from dotenv import load_dotenv

load_dotenv()

class Config:
    """Configurações da aplicação Flask"""
    
    SECRET_KEY = os.getenv('SECRET_KEY', 'dev-secret-key-change-in-production')
    DEBUG = os.getenv('FLASK_DEBUG', 'False') == 'True'
    API_BASE_URL = os.getenv('API_BASE_URL', 'https://api-receitas-pi.vercel.app')
    CORS_ORIGINS = os.getenv('CORS_ORIGINS', 'http://localhost:3000').split(',')
    
    PORT = int(os.getenv('PORT', 5000))