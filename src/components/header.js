import React from 'react';
import { Grid, Typography, Avatar, Link} from '@mui/material';
import { deepOrange, deepPurple } from '@mui/material/colors';
import { UserAuth } from './userContext/userContext';
function Header() {
    const {currentUser, signUserOut} = UserAuth();
    return (
        <Grid
        container
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        >
            <Grid item xs={2}>
                
                <Typography variant="h4" component="div" gutterBottom>
                   AnoMSG
                </Typography>                    
                
            </Grid>
            <Grid item >
                  


                {
                    currentUser ? (
                        <Grid
                        container
                        direction="row"
                        justifyContent="space-between"
                        alignItems="center"
                        >  
                        <Avatar sx={{ bgcolor: deepOrange[500] }} style={{textTransform : 'uppercase'}}>{currentUser.displayName.charAt(0)}</Avatar>                  
                        <div style={{ marginLeft: '15px' }}>
                            <Typography variant="p" component="div" >
                                {currentUser.displayName}
                            </Typography> 
                            <Link onClick={signUserOut} style={{ cursor : 'pointer' }}>
                                Logout        
                            </Link>

                        </div>    
                     </Grid> 
                    
                    ) : (
                    <Typography variant="p" component="div" >
                        Hello!
                    </Typography> 
                    )
                    
                }

 
                
               

            </Grid>            
            
        </Grid>
    );
}

export default Header;