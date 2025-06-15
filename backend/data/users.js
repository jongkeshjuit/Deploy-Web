// backend/data/users.js
const users = [
    {
        name: 'John Doe Admin',
        email: 'john@example.com',
        password: 'admin123',
        role: 'admin',
        gender: 'male',
        phone: '1234567890',
        address: '123 Admin St',
        city: 'Admin City',
        district: 'Admin District',
        ward: 'Admin Ward',
        birth: new Date('1985-01-15')
    },
    {
        name: 'Jane Smith Customer',
        email: 'jane@example.com',
        password: 'user123',
        role: 'customer',
        gender: 'female',
        phone: '0987654321',
        address: '456 User St',
        city: 'User City',
        district: 'User District', 
        ward: 'User Ward',
        birth: new Date('1990-05-20')
    },
    {
        name: 'Mike Johnson',
        email: 'mike@example.com',
        password: 'mike123',
        role: 'customer',
        gender: 'male',
        phone: '0912345678',
        address: '789 Customer St',
        city: 'Ho Chi Minh',
        district: 'District 1',
        ward: 'Ben Nghe Ward',
        birth: new Date('1988-03-10')
    }
];

module.exports = users;