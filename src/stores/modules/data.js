import axios from 'axios';
import { palegoldenrod } from 'color-name';
import { SIGUSR1 } from 'constants';

export default{
    state: {
        fuel: Object,

        carList: Object,
        carsPositions: Object,
        
        notifications: Object,

        availableCarsPositions: Object,
        reservedCarsPositions: Object,
        leasedCarsPositions: Object
    },
    getters: {
        NOTIFICATIONS_LIST: state => {
            console.log(state.notifications);
            return state.notifications;
        },
        FUEL_LIST: state=> {
            console.log(state.fuel);
            return state.fuel;
        },
        CAR_LIST: state => {
            console.log(state.carList);
            return state.carList;
        },
        CARS_POSITIONS: state=> {
            console.log('z geta');
            console.log(state.carsPositions)
            return state.carsPositions;
        },
        CARS_AVAILABLE_POSITIONS: state=> {
            return state.availableCarsPositions;
        },
        CARS_RESERVED_POSITIONS: state => {
            return state.reservedCarsPositions;
        },
        CARS_LEASED_POSITIONS: state=> {
            return state.leasedCarsPositions;
        }
    },
    mutations: {
        SET_NOTIFICATIONS: (state,payload) => {
            state.notifications=payload;
        },
        SET_FUEL: (state, payload) => {
            state.fuel=payload;
        },
        SET_LIST: (state, payload) => {
            state.carList=payload;
        },
        SET_CARS_POSITIONS: (state,obj) => {
            state.carsPositions=obj;
            console.log('pozycje aut obiekt');
            console.log(state.carsPositions);
        },
        SET_AVAILABLE_CARS_POSITIONS: (state,obj)=>{
            state.availableCarsPositions=obj;
        },
        SET_RESERVED_CARS_POSITIONS: (state,obj)=> {
            state.reservedCarsPositions=obj;
        },
        SET_LEASED_CARS_POSITIONS: (state,obj)=> {
            state.leasedCarsPositions=obj;
        }
    },
    actions: {
        DELETE_NOTIFICATIONS: ({commit},payload) => {
            return new Promise((resolve, reject) => {
                let id=payload.id;
                let url="http://localhost:8080/notifications/"+id
                let config = {
                    headers: {
                      'Content-Type': 'application/json',
                      'Access-Control-Allow-Origin': '*',
                      'Access-Control-Allow-Methods': 'DELETE, POST, GET, OPTIONS',
                      'Access-Control-Allow-Headers': 'Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With',
                      'Authorization': 'Bearer '+localStorage.getItem('token')
                      }
                    }
               axios.delete(url,config)
                .then(({data,status}) => {
                    if(status === 200){
                        resolve(true);
                    }
                })
                .catch(error=> {
                    reject(error);
                })
            });
         },
        GET_NOTIFICATIONS_LIST: async ({commit}) => {
            let config = {
                headers: {
                  'Content-Type': 'application/json',
                  'Access-Control-Allow-Origin': '*',
                  'Access-Control-Allow-Methods': 'DELETE, POST, GET, OPTIONS',
                  'Access-Control-Allow-Headers': 'Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With',
                  'Authorization': 'Bearer '+localStorage.getItem('token')
                  }
                }
            let{data}=await axios.get('getNotifications',config)
           // var mamdosc=data.body;
            
            var notifications = data;
          
            console.log("To paliwo");
            console.log(JSON.parse(JSON.stringify(notifications)));
            commit("SET_NOTIFICATIONS",JSON.parse(JSON.stringify(notifications)));
            
        },
        GET_FUEL_LIST: async ({commit}) => {
            let config = {
                headers: {
                  'Content-Type': 'application/json',
                  'Access-Control-Allow-Origin': '*',
                  'Access-Control-Allow-Methods': 'DELETE, POST, GET, OPTIONS',
                  'Access-Control-Allow-Headers': 'Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With',
                  'Authorization': 'Bearer '+localStorage.getItem('token')
                  }
                }
            let{data}=await axios.get('getFuelCost',config)
           // var mamdosc=data.body;
            console.log("DATA Z FUELA"+JSON.stringify(data));
            var fuel = [data];
          
            console.log("To paliwo");
            console.log(JSON.parse(JSON.stringify(fuel)));
            commit("SET_FUEL",JSON.parse(JSON.stringify(fuel)));
            
        },
        GET_CAR_LIST: async ({commit}) => {
            let config = {
                headers: {
                  'Content-Type': 'application/json',
                  'Access-Control-Allow-Origin': '*',
                  'Access-Control-Allow-Methods': 'DELETE, POST, GET, OPTIONS',
                  'Access-Control-Allow-Headers': 'Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With',
                  'Authorization': 'Bearer '+localStorage.getItem('token')
                  }
                }
            console.log('nasz token ze storage');
            console.log(localStorage.getItem('token'));
            let {data} = await axios.get('cars',config)
            console.log('zwrocone auta')
            console.log(data);
            console.log(JSON.stringify(data))
            console.log('koniec zwroconych aut')
            commit("SET_LIST",data)

        },
        GET_RESERVED_CARS_POSITION: async ({commit}) => {
            let config = {
                headers: {
                  'Content-Type': 'application/json',
                  'Access-Control-Allow-Origin': '*',
                  'Access-Control-Allow-Methods': 'DELETE, POST, GET, OPTIONS',
                  'Access-Control-Allow-Headers': 'Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With',
                  'Authorization': 'Bearer '+localStorage.getItem('token')
                  }
                }
                let {data} = await axios.get('cars',config)
                let reserved = data;
                let reservedCars={}
                reservedCars=reserved.map(res=>{
                    var carReservation = true
                    var carService = false
                    if((carReservation===JSON.parse(res.reservation))==1)
                    {
                        if((carService===JSON.parse(res.service))==1)
                        {
                            return{
                                position: {
                                    lat:res.latitude,
                                    lng:res.longitude
                                },
                                vin: res.vin
                            }
                        }
                    }    
                })
                var allReservedCars = reservedCars.filter(v=>v);
                const allReservedCarsArray = JSON.parse(JSON.stringify(allReservedCars));
                commit("SET_RESERVED_CARS_POSITIONS",allReservedCarsArray)

        },
        GET_AVAILABLE_CARS_POSITION: async ({commit}) => {
            let config = {
                headers: {
                  'Content-Type': 'application/json',
                  'Access-Control-Allow-Origin': '*',
                  'Access-Control-Allow-Methods': 'DELETE, POST, GET, OPTIONS',
                  'Access-Control-Allow-Headers': 'Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With',
                  'Authorization': 'Bearer '+localStorage.getItem('token')
                  }
                }
                let {data} = await axios.get('cars',config)
                let available = data;
              
                let availableCars={}
                availableCars=available.map(res=>{
                    var carReservation = false
                    var carService = false
                    if((carReservation===JSON.parse(res.reservation))==1)
                    {
                        if((carService===JSON.parse(res.service))==1)
                        {
                            return{
                                position: {
                                    lat:res.latitude,
                                    lng:res.longitude
                                },
                                vin: res.vin
                            }
                        }
                    }    
                })
                var allAvailableCars = availableCars.filter(v=>v);
                const allAvailableCarsArray = JSON.parse(JSON.stringify(allAvailableCars));
                commit("SET_AVAILABLE_CARS_POSITIONS",allAvailableCarsArray)
        },
        GET_LEASED_CARS_POSITION: async ({commit}) => {
            let config = {
                headers: {
                  'Content-Type': 'application/json',
                  'Access-Control-Allow-Origin': '*',
                  'Access-Control-Allow-Methods': 'DELETE, POST, GET, OPTIONS',
                  'Access-Control-Allow-Headers': 'Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With',
                  'Authorization': 'Bearer '+localStorage.getItem('token')
                  }
                }
                let {data} = await axios.get('cars',config)
                let leased = data;
              
                let leasedCars={}
                leasedCars=leased.map(res=>{
                    var carReservation = false
                    var carService = true
                    if(((carReservation===JSON.parse(res.reservation))==1)||((carReservation===JSON.parse(res.reservation))==0))
                    {
                        if((carService===JSON.parse(res.service))==1)
                        {
                            return{
                                position: {
                                    lat:res.latitude,
                                    lng:res.longitude
                                },
                                vin: res.vin
                            }
                        }
                    }    
                })
                var allLeasedCars = leasedCars.filter(v=>v);
                const allLeasedCarsArray = JSON.parse(JSON.stringify(allLeasedCars));
                commit("SET_LEASED_CARS_POSITIONS",allLeasedCarsArray)
        },

        CREATE_NEW_CAR: async ({commit},payload) => {
            let config = {
                headers: {
                "Authorization": "Bearer "+localStorage.getItem('token'),
                  "Content-Type": "application/json",
                  "Access-Control-Allow-Origin": "*"
                  }
                }
                console.log(payload);
                axios.post('car',payload,config)
            },
            
            
        CREATE_CAR: ({commit},payload) => {
                return new Promise((resolve, reject) => {
                    let config = {
                        headers: {
                        "Authorization": "Bearer "+localStorage.getItem('token'),
                          "Content-Type": "application/json",
                          "Access-Control-Allow-Origin": "*"
                          }
                        }
                    axios.post('/cars', payload, config)
                    .then(({data,status}) => {
                        if(status === 200){
                           // commit('login',data.token);
                            resolve(true);
                        }
                    })
                    .catch(error=> {
                        reject(error);
                    })
                });   
            },
     UPDATE_FUEL_COST:({commit},payload)=>{
                return new Promise((resolve,reject)=>{
                    let id=1;
                    let payloadFuel = {
                        price:payload.price
                    }
                    let url="http://localhost:8080/updateFuelCost/"+id
                    let config = {
                        headers: {
                        "Authorization": "Bearer "+localStorage.getItem('token'),
                          "Content-Type": "application/json",
                          "Access-Control-Allow-Origin": "*"
                          }
                    }  
                    axios.patch(url,payloadFuel,config)
                    .then(({data,status}) => {
                        if(status==200){
                            resolve(true);
                        }
                    }).catch(error=>{
                        reject(error);
                    })
                });
            },
            UPDATE_EXISTING_CAR: ({commit},payload) => {
                return new Promise((resolve, reject) => {
                    let id=payload.id;
                    let payloadCar = {
                        register_number: payload.register_number,
                        cost: payload.cost,
                        latitude: payload.latitude,
                        longitude: payload.longitude,
                        service: payload.service,
                        reservation: payload.reservation,
                    }
                    let url="http://localhost:8080/cars/"+id
                    let config = {
                        headers: {
                        "Authorization": "Bearer "+localStorage.getItem('token'),
                          "Content-Type": "application/json",
                          "Access-Control-Allow-Origin": "*"
                          }
                        }  
                    axios.patch(url, payload, config)
                    .then(({data,status}) => {
                        if(status === 200){
                            resolve(true);
                        }
                    })
                    .catch(error=> {
                        reject(error);
                    })
                }); },


                DELETE_CAR: ({commit},payload) => {
                    return new Promise((resolve, reject) => {
                        let id=payload.id;
                        let url="http://localhost:8080/cars/"+id
                        let token=localStorage.getItem('token')
                       axios.delete(url,{headers:{Authorization:'Bearer '+token, 'Content-Type':'application/json', 'Access-Control-Allow-Origin':'*'}})
                        //axios.delete(url, payload, config)
                        .then(({data,status}) => {
                            if(status === 200){
                                resolve(true);
                            }
                        })
                        .catch(error=> {
                            reject(error);
                        })
                    }); },

            
     }
        
        

    
};