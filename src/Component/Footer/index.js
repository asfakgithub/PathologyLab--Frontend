import React from 'react';
import './index.css';
import {
  Facebook,
  Instagram,
  WhatsApp,
  Telegram,
  YouTube,
  Phone,
  Google,
  Twitter,
} from '@mui/icons-material';
import { IconButton, Typography, Box, Grid } from '@mui/material';

const Footer = () => {
  return (
    <Box component="footer" className="footer-container">
      <Grid container spacing={3} className="footer-grid">
        <Grid item xs={12} md={4} className="footer-section">
          <Typography variant="h6" className="footer-title">Contact Us</Typography>
          <Typography>Registered Office:</Typography>
          <Typography>Lalpur, Dhuliyan, Murshidabad, WB - 742202</Typography>
          <Typography>Phone: <a href="tel:+917501460599" className="footer-link">+91 7501460599</a></Typography>
          <Typography>Email: <a href="mailto:biomechasoft@gmail.com" className="footer-link">biomechasoft@gmail.com</a></Typography>
        </Grid>

        <Grid item xs={12} md={4} className="footer-section">
          <Typography variant="h6" className="footer-title">Quick Links</Typography>
          <a href="#" className="footer-link">Home</a>
          <a href="#" className="footer-link">About</a>
          <a href="#" className="footer-link">Services</a>
          <a href="#" className="footer-link">Contact</a>
          <a href="#" className="footer-link">Privacy Policy</a>
        </Grid>

        <Grid item xs={12} md={4} className="footer-section">
          <Typography variant="h6" className="footer-title">Follow Us</Typography>
          <div className="footer-icons">
            <IconButton className="icon-button" href="https://facebook.com" target="_blank"><Facebook /></IconButton>
            <IconButton className="icon-button" href="https://instagram.com" target="_blank"><Instagram /></IconButton>
            <IconButton className="icon-button" href="https://threads.net" target="_blank"><Twitter /></IconButton>
            <IconButton className="icon-button" href="https://wa.me/917501460599" target="_blank"><WhatsApp /></IconButton>
            <IconButton className="icon-button" href="https://t.me/ilabchannel" target="_blank"><Telegram /></IconButton>
            <IconButton className="icon-button" href="tel:+917501460599"><Phone /></IconButton>
            <IconButton className="icon-button" href="https://youtube.com" target="_blank"><YouTube /></IconButton>
            <IconButton className="icon-button" href="mailto:biomechasoft@gmail.com"><Google /></IconButton>
          </div>
        </Grid>
      </Grid>
      <Typography className="footer-bottom">© {new Date().getFullYear()} I Lab. All rights reserved.</Typography>
    </Box>
  );
};

export default Footer;
