from flask import Flask, render_template, request, redirect
import db, cgi, json, urllib, urllib2

app = Flask(__name__)
app.secret_key = 'insert_clever_secret_here'

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/entries",methods=['GET','POST'])
def handleEntryRequest():
    if request.method=='GET':
        return json.dumps(db.getEntries())
    else:
        return `db.addEntry(request.json['name'])`

@app.route("/entries/<entryID>", methods=['PUT'])
def handleUpdateEntryRequest(entryID):
    if request.method=='PUT':
        newname = request.json['name']
        return `db.editEntryName(entryID,newname)`
            
if __name__ == "__main__":
    app.debug = True
    app.run(host="0.0.0.0", port=8000)
