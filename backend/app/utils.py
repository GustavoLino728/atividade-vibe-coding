from functools import wraps
from flask import jsonify
import logging

# Configurar logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

def handle_errors(f):
    """Decorator para tratamento de erros"""
    @wraps(f)
    def decorated_function(*args, **kwargs):
        try:
            return f(*args, **kwargs)
        except ValueError as e:
            logger.error(f"Erro de validação: {str(e)}")
            return jsonify({
                'error': 'Erro de validação',
                'message': str(e)
            }), 400
        except ConnectionError as e:
            logger.error(f"Erro de conexão com API: {str(e)}")
            return jsonify({
                'error': 'Erro de conexão',
                'message': 'Não foi possível conectar à API de receitas'
            }), 503
        except Exception as e:
            logger.error(f"Erro inesperado: {str(e)}")
            return jsonify({
                'error': 'Erro interno',
                'message': 'Ocorreu um erro inesperado'
            }), 500
    return decorated_function

def validate_query_params(params, required_params=None):
    """Valida parâmetros de query"""
    if required_params:
        missing = [param for param in required_params if param not in params]
        if missing:
            raise ValueError(f"Parâmetros obrigatórios ausentes: {', '.join(missing)}")
    return True