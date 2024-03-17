from app import db, app
from enum import StrEnum

time_format = "%Y-%m-%dT%H:%M:%S.%fZ"

# Python enum sharing name with GraphQL enum
class CandidateStep(StrEnum):
    DRUG_TEST = "Drug Test"
    BACKGROUND_CHECK = "Background Check"
    PAPERWORK = "Paperwork"

class Candidate(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(250))
    email = db.Column(db.String(250))
    phone = db.Column(db.String(250))
    step = db.Column(db.String(75), nullable=True)
    time_interview = db.Column(db.DateTime)
    profile_url = db.Column(db.String(250))
    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name,
            "email": self.email,
            "phone": self.phone,
            "step": self.step,
            "time_interview": str(self.time_interview.strftime(time_format)),
            "profile_url": self.profile_url,
        }
    

import json
from datetime import datetime

with app.app_context():

    print("Dropping tables...")
    db.drop_all()

    print("Creating tables...")
    db.create_all()

    print("Creating Candidates...")

    f = open("./seeder.json")

    data = json.load(f)

    for candidate in data:
        step = candidate['step']
        if (step == ""):
            step = None
          
        new_candidate = Candidate(name=candidate["name"], email=candidate["email"], phone=candidate["phone"], step=step, time_interview=datetime.strptime(candidate["time_interview"], time_format), profile_url=candidate["profile_url"])
        db.session.add(new_candidate)

    print("Committing...")
    db.session.commit()

    print("Done!")
    