import React, { Component } from 'react'
import { Card, CardContent, withStyles, Typography } from '@material-ui/core';
import { traverseTwoPhase } from 'react-dom/test-utils';

//MaterialUI styles
const styles = theme => ({
    card: {
        borderRadius:"16px;",
        boxShadow: `6px 6px 8px 0 rgba(0, 0, 0, 0.25),
        -4px -4px 6px 0 rgba(75, 75, 75, 0.3);`,
        backgroundColor: `#18191a`,
        background: `linear-gradient(-45deg, rgba(0,0,0,0.22), rgba(2,2,2,0.25));`,
        display:'flex',
        flexDirection:'row'
    },
    signInText: {
        color: '#03ac13',
        fontFamily: `"Lucida Console", "Courier New", monospace`
    },
    signOutText: {
        color: 'red',
        fontFamily: `"Lucida Console", "Courier New", monospace`
    },
    text: {
        color:'whitesmoke',
    },
    time: {
        position:'relative',
        left:'100%',
    },
    timeContainer: {
        display:'flex',
        flexDirection:'column'
    }, 
    topText: {
        marginBottom:'1em'
    }


})
class User extends Component {
    constructor(props){
        super(props)
        this.state = {
            //Putting ajax call props in state var will need the use of componentWillReceiveProps() so no
        }
    }
    showTime(){
        const {timeIn} = this.props //Time in milliseconds
        if(!timeIn) return "00:00:00"
        const hourValue = timeIn / 1000 / 60 / 60
        const userHours = Math.floor(hourValue)
        const minuteValue = (hourValue - userHours) * 60
        const userMinutes = Math.floor(minuteValue)
        const userSeconds = Math.floor((minuteValue - userMinutes) * 60)
        return `${String(userHours).padStart(2, '0')}:${String(userMinutes).padStart(2, '0')}:${String(userSeconds).padStart(2, '0')}`
    }
    showTotalTime(){
        const {totalTime} = this.props
        if(!totalTime) return "00:00:00"
        const hourValue = totalTime / 1000 / 60 / 60
        const userHours = Math.floor(hourValue)
        const minuteValue = (hourValue - userHours) * 60
        const userMinutes = Math.floor(minuteValue)
        const userSeconds = Math.floor((minuteValue - userMinutes) * 60)
        return `${String(userHours).padStart(2, '0')}:${String(userMinutes).padStart(2, '0')}:${String(userSeconds).padStart(2, '0')}`
    }
    
    
    render() {
        const {classes, isSignedIn, username, totalTime} = this.props
        const signInStyles = isSignedIn === 1 ? classes.signInText : classes.signOutText;
        const signedInOutText = isSignedIn === 1 ? "IN" : "OUT"
        
        return (
            <div className={"user-container"}>
                <Card className={classes.card}>
                    <CardContent>
                        <Typography className={`${classes.text} ${classes.topText}`}>{username}</Typography>
                        <Typography className={`${signInStyles}`}>SIGNED {signedInOutText}</Typography>
                    </CardContent>
                    <CardContent className={classes.timeContainer}>
                        <Typography className={`${classes.text} ${classes.time} ${classes.topText}`}>Time In: {this.showTime()} </Typography>
                        <Typography className={`${classes.text} ${classes.time}`}>
                            Total Time: {this.showTotalTime()} 
                        </Typography>
                    </CardContent>
                </Card>
            </div>
        )
    }
}

export default withStyles(styles)(User)