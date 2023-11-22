**DO YOU HAVE FIRE?**

**HIGH-LEVEL SUMMARY**

How do we reach out to the community in an innovative way, offering something that so many other wildfire monitoring platforms don't have? With participation. In *Do you have a fire?* We propose that society help in the monitoring and corroboration of the thermal anomalies reported by the MODIS and VIIRS satellites. We noticed that near our city there is an anomaly that has a chance of being a fire, but we know that it is not such a thing, it is a hydrocarbon processing plant, YPF. But satellites have no way of discerning this data, they only measure numerical variants. It is we, the citizens, who can complement NASA data with our local knowledge to provide a more complete service.

Comments regarding the measured anomalies can be left on the platform. They will be carried out by users, who can register with the platform's own system or with Google. These users may also belong to organizations, municipal governments, fire departments, private companies, etc., through data verification. In this way, everyone, citizens and institutions, will be able to participate. Some may comment on their local knowledge, others corroborate with their authority. Validated comments from organizations will remain saved in the database.

Additionally, users will be able to select an area of interest to receive alerts to their email if an anomaly is perceived by satellites.

And what happens if there is a fire that is not on the platform? If a user wishes to report a fire, they can send us a message that will be received by our team, which will be in charge of verifying the situation. If it is indeed a fire, we will add it to the map. This type of intervention will be deleted after 24 hours if the satellites do not report an anomaly.

On the other hand, the platform will have an integrated news interface that will show news about forest fires in the selected anomaly. Thus, in addition to citizen and institutional participation, there will be access to information from the media.

Our intention for the future is to continue improving our service. Allow users to determine their areas of interest using polygons. Thus, for example, districts will be able to determine their exact areas and concentrate their alerts on the territory they occupy. We hope to be able to analyze user comments to give them a ranking of truthfulness and highlight those who make positive collaborations. And with our database, made up of historical comments, we enable the user a way to review them to consult the events that took place in a certain area. One of the implementations we most want to add is access to emergency numbers operating in an area, so that users can report fires to the relevant authorities and not just to our corroborators. We also want to implement tools so that other developers can expand our system.

**PROJECT DEMO**

[Project Demo](https://view.genial.ly/6522d620cf56e90012a565e0/presentation-presentacion-fuego)

**FINAL PROJECT**

[Final Project](https://terramida.vercel.app/)

**PROJECT DETAILS**

Hello everyone,

We are excited to present "Do you have fire?" – our project for the NASA Hackathon.

Our project aims to provide technical and complex information to non-technical individuals, enabling them to assess the presence of fires in their desired areas.

Users can easily register using their Google accounts and gain access to a dynamic map displaying thermal anomalies. By clicking on areas with anomalies, users can initiate a report regarding potential issues. Within these reports, they have the opportunity to leave comments, informing others about the situation, whether it's an actual fire or simply a heat signature from a factory.

In addition to these features, public and private organizations can access special services such as selecting areas of interest to receive event notifications via email, validating event causes with their unique insights, and broadcasting notifications to both the community and media outlets.

For the development of our application, we've designed two servers. The frontend, built with Next.js and hosted on Vercel, offers server-side rendering to enhance security and speed by concealing credentials. This frontend server is responsible for displaying maps, their layers, and facilitating interactions with events and comments, making access to the system seamless and user-friendly.

On the other hand, we've created a backend using Express, hosted on Fl0, which communicates with satellites and performs essential geographical calculations. It measures distances, validates event creations, and notifies organizations, among other critical functions.

In conclusion, "Do you have fire?" is not just an innovative solution for fire detection; it's a comprehensive platform that empowers individuals and organizations to take informed action in the face of potential fire incidents. Thank you for your attention, and we look forward to your feedback and support.

**Repositories:**

- Frontend: [GitHub - Frontend](https://github.com/lucasrodriguezdavila/terramida)
- Backend: [GitHub - Backend](https://github.com/lucasrodriguezdavila/template-nodejs)

**SPACE AGENCY DATA**

- FIRMS - Fire Information for Resource Management System (FIRMS)
- Open Geospatial Consortium (OGC) Web Map Service (WMS)

**REFERENCES**

- Express
- dotenv
- Firebase
- Zod
- node-cron
- Turf.js
- axios
- Papa Parse
- Nodemailer
- Node.js
- FL0
- Next.js
- Vercel
- fakerjs
