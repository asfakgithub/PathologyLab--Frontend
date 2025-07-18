// import React from 'react';
// import './index.css';
// import { Grid, IconButton, Typography, Box } from '@mui/material';
// import FacebookIcon from '@mui/icons-material/Facebook';
// import InstagramIcon from '@mui/icons-material/Instagram';
// import { Google } from '@mui/icons-material';

// const Footer = () => {
//   return (
//     <Box
//       sx={{
//         backgroundColor: '#52ab98',
//         padding: '2rem',
//         color: 'whitesmoke',
//         textAlign: 'center',
//       }}
//     >
//       {/* Social Media Icons */}
//       <Typography variant="body1" mb={1} className="flex justify-between ">
//         <a>
//           Follow us on social media:
//           <IconButton sx={{ color: 'blue', ml: 1 }} aria-label="Facebook">
//             <a href="https://www.facebook.com/AsifReza" target="_blank" rel="noopener noreferrer">
//               <FacebookIcon />
//             </a>
//           </IconButton>
//           <IconButton sx={{ color: 'blue' }} aria-label="Google">
//             <a href="mailto:biomechasoft@gmail.com">
//               <Google />
//             </a>
//           </IconButton>
//           <IconButton sx={{ color: 'blue' }} aria-label="Instagram">
//             <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
//               <InstagramIcon />
//             </a>
//           </IconButton>
//         </a>
//         <a>
//           © {new Date().getFullYear()} Pathology Lab PVT LTD. All rights reserved.
//         </a>
//       </Typography>


//       <Grid container spacing={3} justifyContent="center" alignItems="flex-start">
//         {/* Left Side - Address */}
//         <Grid item xs={12} md={6}>
//           <Typography variant="h6" gutterBottom>
//             Our Address:
//           </Typography>
//           <Typography variant="body2">
//             Registered Office - Lalpur, Dhuliyan, Murshidabad, West Bengal, 742202
//           </Typography>
//           <Typography variant="body2">
//             City Office - Lalpur, Dhuliyan, Murshidabad, West Bengal, 742202
//           </Typography>
//         </Grid>

//         {/* Right Side - Phone Number */}
//         <Grid item xs={12} md={6}>
//           <Typography variant="h6" gutterBottom>
//             Phone Number:
//           </Typography>
//           <Typography variant="body2" sx={{ color: '#00e5ff' }}>
//             +91 7501460599
//           </Typography>
//         </Grid>
//       </Grid>


//     </Box>
//   );
// };

// export default Footer;



import React from 'react'
import "./index.css"
import { Grid, IconButton, Typography } from "@mui/material";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import { Google } from "@mui/icons-material";

const Footer = () => {
  return (
    <div className='footer'>
      <div className='colFooter'>
        <a className="footer-anchor" href='#'>Option 1</a>
        <a className="footer-anchor" href='#'>Option 2</a>
        <a className="footer-anchor" href='#'>Option 3</a>
        <a className="footer-anchor" href='#'>Option 4</a>
        <a className="footer-anchor" href='#'>Option 5</a>
      </div>
      <div className='colFooter'>
        <a className="footer-anchor" href='#'>Option 1</a>
        <a className="footer-anchor" href='#'>Option 2</a>
        <a className="footer-anchor" href='#'>Option 3</a>
        <a className="footer-anchor" href='#'>Option 4</a>
        <a className="footer-anchor" href='#'>Option 5</a>
      </div>
      <div className='colFooter'>
        <a className="footer-anchor" href='#'>Option 1</a>
        <a className="footer-anchor" href='#'>Option 2</a>
        <a className="footer-anchor" href='#'>Option 3</a>
        <a className="footer-anchor" href='#'>Option 4</a>
        <a className="footer-anchor" href='#'>Option 5</a>
      </div>
    </div>

    // <div className='footer'>
    //   <Grid
    //     container
    //     component="footer"
    //     justifyContent="center"
    //     alignItems="center"
    //     sx={{ backgroundColor: "#52ab98", padding: "2rem" }}
    //   >
    //     <Grid
    //       item
    //       container
    //       xs={12}
    //       md={6}
    //       justifyContent="center"
    //       alignItems="center"
    //       textAlign="center"
    //     >
    //       <Typography variant="body1" color="whitesmoke" mb={1}>
    //         Follow us on social media:
    //       </Typography>
    //       <IconButton color="primary" aria-label="Facebook" sx={{ mr: 1 }}>
    //         <a href="https://www.facebook.com/AsifReza" ><FacebookIcon /></a>
    //       </IconButton>
    //       <IconButton color="primary" aria-label="Twitter" sx={{ mr: 1 }}>
    //         <a href="https://www.BioMechasoft@gmail.com" rel="external"><Google /></a>
    //       </IconButton>
    //       <IconButton color="primary" aria-label="Instagram">
    //         <InstagramIcon />
    //       </IconButton>
    //     </Grid>
    //     <Grid item xs={12} md={6} textAlign="center">
    //       <Typography variant="body1" color="whitesmoke">
    //         © {new Date().getFullYear()} BIOMECHASOFT PVT LTD. All rights
    //         reserved.
    //       </Typography>
    //     </Grid>
    //     <Grid item xs={12} md={6} textAlign="center">
    //       <Typography variant="h5" color="whitesmoke" mt={2}>
    //         Our Address:
    //       </Typography>
    //       <Typography>
    //         Registered Office - Uttar Dariapur, Kaliachak, Malda, West Bengal,
    //         732201
    //       </Typography>
    //       <Typography>
    //         City Office - Dhuliya, Murshidabad, West Bengal, 742202
    //       </Typography>
    //     </Grid>
    //     <Grid item xs={12} md={6} textAlign="center">
    //       <Typography variant="h5" color="whitesmoke" mt={2}>
    //         Phone Number:
    //       </Typography>
    //       <Typography color="blue">+91 7501460599</Typography>
    //     </Grid>
    //   </Grid>
    // </div>
  )
}

export default Footer