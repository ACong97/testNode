const { faker } = require('@faker-js/faker');
const fs = require('fs');

// Set locale to use Vietnamese
faker.locale = 'vi';

// Random data

// course
const randomCourseList = (n) => {
    if (n <= 0) return [];

    const courseList = []

    // Loop and push course
    Array.from(new Array(n)).forEach(() => {
        const course = {
            id: faker.datatype.uuid(),
            place: faker.commerce.department(),
            description: faker.commerce.productDescription()
        }

        courseList.push(course)
    })

    return courseList;
}

// student
const randomStudentList = (courseList, numberStudent) => {
    if(numberStudent <= 0) return [];

    const studentList = []

    // loop and push student
    for( let course of courseList ) {
        Array.from(new Array(numberStudent)).forEach(() => {
            const student = {
                id: course.id,
                name: faker.internet.userName(),
                avatar: faker.internet.avatar(),
                money: Number.parseFloat(faker.commerce.price(1, 3))
            }

            studentList.push(student)
        })
    }

    return studentList;
}

// location
const randomLocation = (n) => {
    if(n<=0) return [];

    const locationList = []

    Array.from(new Array(n)).forEach(() => {
        const location = {
            id: faker.datatype.uuid(),
            location: faker.address.cityName()
        }

        locationList.push(location)
    })

    return locationList;
}


// IFFE
(() => {
    // random data
    const courseList = randomCourseList(4)
    const studentList = randomStudentList(courseList, 20)
    const locationList = randomLocation(1000)

    // prepare DB object
    const db = {
        courses: courseList,
        students: studentList,
        locations: locationList,
        profileHost: {
            name: "Công",
        },
    }

    // write 
    fs.writeFile('db.json', JSON.stringify(db), () => {
        console.log('success!!')
    })
})()