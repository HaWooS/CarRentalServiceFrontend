<template>
<div class ="bg">
    <v-container>
        <v-layout align-center justify-center>
            <v-flex xs12 sm8 md3>
                <v-form class="lf">
                    <v-card class="elevation-12">
                        <v-toolbar dark color="blue">
                            <v-toolbar-title>
                                Login
                            </v-toolbar-title>
                        </v-toolbar>

                        <v-card-text>
                            <v-form><v-alert
                                :value=error
                                color="error">
                                Nieprawidlowa nazwa uzytkownika lub haslo
                                
                                </v-alert></v-form>
                            <v-text-field
                                v-model="username"
                                name="login"
                                label="Login"
                                type="text">
                            </v-text-field>

                            <v-text-field
                                v-model="password"
                                name="password"
                                label="Password"
                                type="password">
                                
                            </v-text-field>
                        </v-card-text>
                        <v-divider light></v-divider>
                        <v-card-actions>
                            <v-btn round color="grey" dark @click.prevent="login()">
                                Login
                        
                            </v-btn>
                        </v-card-actions>
                    </v-card>
                </v-form>
            </v-flex>
        </v-layout>
    </v-container>
</div>
</template>

<script>
export default {
    name: "login",
    
    data: () => ({
        error: false,
        username: '',
        password: ''
    }),

    methods:{
        login(){
            this.$store.dispatch("LOGIN", {
                username: this.username,
                password: this.password
            })
            .then(success=> {
                
                this.$router.push("/")
            })
            .catch(error=>{
                this.error=true;
            })
        }
    }
    
    
};
</script>
<style>
 body, html {
    height: 100%;
  }
  .bg {
    background-image: url('./../../photos/login.jpg');
    height: 100%;
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
  }
  .lf{
      margin-top: 30%;
  }
</style>