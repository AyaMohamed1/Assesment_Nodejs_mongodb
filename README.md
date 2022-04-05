# Assesment using Nodejs and mongodb.
- Sending email after signup to verify account.
- CRUD operations for checks using auth.
- Please add .env file to the project to run it.
- Run the project using "npm run start" command
# For Signup
- Using route: http://localhost:8000/api/signup
- Enter name, email, password
- Email must be one of those ( aya.m.abead@gmail.com, ayamohamed102000@gmail.com)
# After signup, email would be send to the email with token
- Using http://localhost:8000/api/email-activate
- Enter the token
# Then login (You must login for CRUD)
- Using http://localhost:8000/api/login
- Enter email and password, a token will be generated, use it for CRUD operations
# Get
- http://localhost:8000/api/checks
- Gets all the checks with details, that your created
# Get with check id
- http://localhost:8000/api/checks/<your check id>
- Gets the check details, that your created
# Post a check
- http://localhost:8000/api/checks
- Create a new check with: name, url, protocol
# Delete a check
- http://localhost:8000/api/checks/<your check id>
- Deletes the check, only if you are its owner.
 # Update a check
- http://localhost:8000/api/checks/<your check id>
- Update the check data (name, url, protocol), only if you are its owner.
