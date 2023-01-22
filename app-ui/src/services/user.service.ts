export class UserService {

    async getAllUsers() {

        const response = await fetch('/api/users');
        return await response.json();
    }
    
    async createUser(data: any) {
        const response = await fetch(`/api/user`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({user: data})
          })
        return await response.json();
    }

    async adminLogin(data:any) {
        const response = await fetch('/api/admin', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({user: data})
        })
        return await response.json();
    }

    async userLogin(data:any) {
        const response = await fetch('/api/login', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({user: data})
        })
        return await response.json();
    }

    async getWeatherData(data:any) {

        console.log(data)
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${data.lat}&lon=${data.long}&appid=256e89101f204a36f97146eef7de7c49`)

        return await response.json();
    }
}