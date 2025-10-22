from flask import Blueprint, request, jsonify
from app.services.api_service import APIService
from app.utils import handle_errors, validate_query_params, logger

receitas_bp = Blueprint('receitas', __name__, url_prefix='/api/receitas')
api_service = APIService()

@receitas_bp.route('/health', methods=['GET'])
def health_check():
    """Endpoint de health check"""
    return jsonify({
        'status': 'ok',
        'message': 'Backend Flask funcionando'
    }), 200

@receitas_bp.route('/todas', methods=['GET'])
@handle_errors
def get_todas_receitas():
    """Retorna todas as receitas com paginação"""
    page = request.args.get('page', 1, type=int)
    limit = request.args.get('limit', 10, type=int)
    
    # Validar limites
    if limit > 100:
        limit = 100
    if page < 1:
        page = 1
    
    resultado = api_service.get_todas_receitas(page=page, limit=limit)
    return jsonify(resultado), 200

@receitas_bp.route('/<int:receita_id>', methods=['GET'])
@handle_errors
def get_receita_por_id(receita_id):
    """Retorna uma receita específica por ID"""
    resultado = api_service.get_receita_por_id(receita_id)
    return jsonify(resultado), 200

@receitas_bp.route('/tipo/<string:tipo>', methods=['GET'])
@handle_errors
def get_receitas_por_tipo(tipo):
    """Retorna receitas filtradas por tipo"""
    resultado = api_service.get_receitas_por_tipo(tipo.lower())
    return jsonify(resultado), 200

@receitas_bp.route('/buscar', methods=['GET'])
@handle_errors
def buscar_receitas():
    """
    Busca receitas por nome/descrição ou ingredientes
    Query params:
    - q: termo de busca (nome/descrição)
    - ingredientes: lista de ingredientes separados por vírgula
    - page: página (default: 1)
    - limit: limite por página (default: 10)
    """
    query = request.args.get('q', '').strip()
    ingredientes_str = request.args.get('ingredientes', '').strip()
    page = request.args.get('page', 1, type=int)
    limit = request.args.get('limit', 10, type=int)
    
    # Validar que pelo menos um parâmetro foi fornecido
    if not query and not ingredientes_str:
        return jsonify({
            'error': 'Parâmetros inválidos',
            'message': 'Informe "q" para busca por nome ou "ingredientes" para busca por ingredientes'
        }), 400
    
    # Buscar por ingredientes
    if ingredientes_str:
        ingredientes = [ing.strip() for ing in ingredientes_str.split(',') if ing.strip()]
        if ingredientes:
            resultado = api_service.buscar_por_ingredientes(ingredientes, page=page, limit=limit)
            return jsonify(resultado), 200
    
    # Buscar por nome/descrição
    if query:
        resultado = api_service.get_receitas_por_descricao(query, page=page, limit=limit)
        return jsonify(resultado), 200
    
    return jsonify({
        'error': 'Nenhum resultado encontrado'
    }), 404

@receitas_bp.route('/<int:receita_id>/ingredientes', methods=['GET'])
@handle_errors
def get_ingredientes(receita_id):
    """Retorna os ingredientes de uma receita específica"""
    resultado = api_service.get_ingredientes_por_receita(receita_id)
    return jsonify(resultado), 200

@receitas_bp.route('/filtrar', methods=['GET'])
@handle_errors
def filtrar_receitas():
    """
    Endpoint combinado para filtros múltiplos
    Query params:
    - tipo: tipo de receita (doce, salgado, agridoce)
    - q: busca por nome
    - page, limit: paginação
    """
    tipo = request.args.get('tipo', '').strip().lower()
    query = request.args.get('q', '').strip()
    page = request.args.get('page', 1, type=int)
    limit = request.args.get('limit', 10, type=int)
    
    # Se tem tipo, buscar por tipo
    if tipo:
        resultado = api_service.get_receitas_por_tipo(tipo)
        
        # Se também tem query, filtrar os resultados
        if query and 'data' in resultado:
            receitas_filtradas = [
                r for r in resultado['data']
                if query.lower() in r.get('receita', '').lower()
            ]
            resultado['data'] = receitas_filtradas
            resultado['meta'] = {
                'itemCount': len(receitas_filtradas)
            }
        
        return jsonify(resultado), 200
    
    # Se só tem query, buscar por descrição
    if query:
        resultado = api_service.get_receitas_por_descricao(query, page=page, limit=limit)
        return jsonify(resultado), 200
    
    # Se não tem nada, retornar todas
    resultado = api_service.get_todas_receitas(page=page, limit=limit)
    return jsonify(resultado), 200