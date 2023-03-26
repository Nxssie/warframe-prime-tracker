import { createClient } from "@supabase/supabase-js";
import Button from '@mui/material/Button';
import {Container} from "@mui/material";
import {UserContext} from "../../App.jsx";
import {useContext} from "react";

const supabase = createClient("https://ounfkpirehzcengtgnwd.supabase.co", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im91bmZrcGlyZWh6Y2VuZ3RnbndkIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzkyMjYxNjQsImV4cCI6MTk5NDgwMjE2NH0.fwkicpdUoo_83fhZItm-2sPmIrmjlBNZLdwTqsCgKTY");

function Auth() {

    const {user, setUser} = useContext(UserContext);

    async function signInWithDiscord() {
        const {data, error} = await supabase.auth.signInWithOAuth({
            provider: 'discord',
        })
    }

    async function signout() {
        const { error } = await supabase.auth.signOut()
    }

    supabase.auth.onAuthStateChange((event, session) => {
        if(event == "SIGNED_IN") {
            getSessionData();
        }
    })

    function setSessionData(accesToken, refreshToken) {
        const { data, error } = supabase.auth.setSession({
            accesToken,
            refreshToken
        })
    }

    async function getSessionData() {
        const { data, error } = await supabase.auth.getSession();
        console.log('data', data);
    }

    async function getUser() {
        const { data: { user } } = await supabase.auth.getUser()
    }

    return(
        <Container>
            <Button variant="outlined" onClick={() => signInWithDiscord()}>Login</Button>
        </Container>
    )
}

export default Auth
