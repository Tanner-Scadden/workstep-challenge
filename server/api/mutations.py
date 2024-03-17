from datetime import datetime
from ariadne import convert_kwargs_to_snake_case, ObjectType
from api import db
from api.models import Candidate, time_format

@convert_kwargs_to_snake_case
def update_candidate_resolver(obj, info, id, update):
    try:
        candidate = Candidate.query.get(id)

        if not candidate:
            payload = {
                "success": False,
                "errors": [f"candidate matching id {id} not found"]
            }
            return payload

        candidate.name = update["name"]
        candidate.email = update["email"]
        candidate.phone = update["phone"]
        candidate.step = update["step"]
        candidate.time_interview = datetime.strptime(update["time_interview"], time_format)
        candidate.profile_url = update["profile_url"]
        
        db.session.add(candidate)
        db.session.commit()

        payload = {
            "success": True,
            "candidates": [candidate.to_dict()]
        }
    except AttributeError as e:  # todo not found
        print(e)
        payload = {
            "success": False,
            "errors": [f"candidate matching id {id} not found"]
        }
    return payload

mutation = ObjectType("Mutation")
mutation.set_field("updateCandidate", update_candidate_resolver)
