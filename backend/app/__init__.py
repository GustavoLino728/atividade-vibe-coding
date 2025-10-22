from flask import Flask
from flask_cors import CORS
from app.config import Config
from app.routes.receitas import receitas_bp

def create_app():
    """Factory para criar a aplicação Flask"""
    
    app = Flask(__name__)
    app.config.from_object(Config)
    
    # Configurar CORS
    CORS(app, resources={
        r"/api/*": {
            "origins": Config.CORS_ORIGINS,
            "methods": ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
            "allow_headers": ["Content-Type", "Authorization"]
        }
    })
    
    # Registrar blueprints
    app.register_blueprint(receitas_bp)
    
    # Rota raiz
    @app.route('/')
    def index():
        return {
            'message': 'API Backend - Receitas App',
            'status': 'running',
            'endpoints': {
                'health': '/api/receitas/health',
                'todas': '/api/receitas/todas',
                'buscar': '/api/receitas/buscar',
                'filtrar': '/api/receitas/filtrar',
                'por_id': '/api/receitas/<id>',
                'por_tipo': '/api/receitas/tipo/<tipo>',
                'ingredientes': '/api/receitas/<id>/ingredientes'
            }
        }
    
    return app