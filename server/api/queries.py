from .models import Candidate
from ariadne import convert_kwargs_to_snake_case, ObjectType
from sqlalchemy import func

def searchCandidates_resolver(obj, info, name = "", step = ""):
    try:
        queries = []
        if (name):
            queries.append(func.lower(Candidate.name).contains(name.lower()))
        
        if (step):
            queries.append(Candidate.step == step)

        
        candidates = [candidate.to_dict() for candidate in Candidate.query.filter(*queries).all()]

        print(f'Search Results: {candidates}')

        payload = {
            "success": True,
            "candidates": candidates
        }
    except Exception as error:
        payload = {
            "success": False,
            "errors": [str(error)]
        }
    return payload


query = ObjectType("Query")
query.set_field("searchCandidates", searchCandidates_resolver)
