import sqlite3

conn = sqlite3.connect("data.db")

c = conn.cursor()

def dropTable(tablename):
    c.execute("DROP TABLE %s" % (tablename))
    conn.commit()
    print ("DROP TABLE %s" % (tablename))

def createTable(tablename, attr):
    """Creates a table in the database \'blog.db\'
    1st parameter - name of table (string)
    2nd parameter - Dictionary with keys and types as values'
    """
    print tablename
    L = [k[0]+' '+k[1] for k in attr]
##    L = [k+' '+attr[k] for k in attr.keys()]
    s = ','.join(L)
    c.execute("CREATE TABLE %s(%s)" % (tablename, s))
    conn.commit()
    print ("CREATE TABLE %s(%s)") % (tablename, s)

def createTables():
    createTable('entries', [('name','text')])

def dropTables():
    dropTable('entries')

def addEntry(name):
    conn = sqlite3.connect('data.db')
    c = conn.cursor()
    c.execute("INSERT INTO entries VALUES ('%s')" %(name))
    conn.commit()
    print "added %s to entries" %(name)
    return True

def editEntryName(entryID,name):
    conn = sqlite3.connect('data.db')
    c = conn.cursor()
    t = (name,entryID)
    c.execute("UPDATE entries SET name = ? WHERE oid = ?",t)
    conn.commit()
    print "updated entry %s: set name to %s"%(entryID,name)
    return True
    
def getEntries():
    'returns a collection of trips'
    conn = sqlite3.connect('data.db')
    c = conn.cursor()
    entries = []
    for row in c.execute('SELECT rowid,* FROM entries'):
        entries.append({"id":row[0], "name":row[1]})
    print 'entries: '+`entries`
    return entries

        
