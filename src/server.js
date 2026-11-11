require('dotenv').config(); // falls du .env verwendest

const express = require('express');
const nodemailer = require('nodemailer');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const cors = require('cors');
const path = require('path');
const maschinen = require('./data/maschinen');

const app = express();
app.use(helmet());
app.use(cors());
app.use(express.json());

// Rate Limiting: max. 1 Anfrage pro Minute/IP
const sendLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 Minute
  max: 1,
  message: 'Zu viele Anfragen - bitte versuche es später erneut.',
});

// Mailer konfigurieren
const transporter = nodemailer.createTransport({
  host: 'smtp.mail.de',
  port: 587,
  secure: false,
  auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS },
  logger: true,
  debug: true,
  tls: { rejectUnauthorized: false }
});

// Debug
transporter.verify(function(error, success) {
  if (error) {
    console.error('SMTP-Verbindungsfehler:', error);
  } else {
    console.log('SMTP-Server ist bereit, E-Mails zu senden');
  }
});

// POST /send
app.post('/send', sendLimiter, async (req, res) => {
  const { name, email, telefon, message, website } = req.body; // "website" ist das Honeypot-Feld

  // 🐝 Bot-Schutz (Honeypot)
  if (website && website.trim() !== '') {
    console.warn('Bot erkannt:', { ip: req.ip, website });
    return res.status(400).json({ error: 'Bot erkannt' });
  }

  // Feldprüfung
  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Name, E-Mail und Nachricht sind Pflichtfelder' });
  }

const mailOptions = {
  from: process.env.EMAIL_USER, // korrekt: deine eigene Mail
  to: process.env.EMAIL_USER,   // Nachricht geht an dich selbst
  replyTo: email,               // Benutzer-E-Mail, auf die du antworten kannst
  subject: `Neue Nachricht von ${name}`,
  text: `Name: ${name}\nEmail: ${email}\nTelefon: ${telefon || 'nicht angegeben'}\n\n${message}`,
};

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ success: 'Nachricht erfolgreich gesendet' });
  } catch (error) {
    console.error('Fehler beim E-Mail-Versand:', error);
    res.status(500).json({ error: 'Fehler beim Senden der E-Mail' });
  }
});

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.get(['/', '/index.html'], (req, res) => {
  res.render('index', { maschinen });
});

app.get('/maschinen/:slug', (req, res) => {
  const maschine = maschinen.find(eintrag => eintrag.slug === req.params.slug);

  if (!maschine) {
    return res.status(404).send('Maschine nicht gefunden.');
  }

  res.render('maschine', { maschine });
});

const staticDir = path.join(__dirname, 'static');
// const cssFile = path.join(staticDir, 'styles', 'style.css');

// console.log('Serverdatei:', __filename);
// console.log('CSS-Datei:', cssFile);
// console.log('CSS vorhanden:', require('fs').existsSync(cssFile));

app.use(express.static(staticDir));

// app.use(express.static(path.join(__dirname, 'static')));

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`✅ Server läuft auf http://localhost:${PORT}`);
});

// app.use(express.static('static')); // Statische Dateien ohne Limit
