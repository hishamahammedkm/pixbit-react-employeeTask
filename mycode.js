const designations = [{ id: 5, name: "java" }, { id: 6, name: "PHP" },
{ id: 9, name: "Python" }, { id: 3, name: "Js" }

]
// console.log(designations);
const employees = [
    {id:3,designation_id:5,gender:'male',first_name:'hisham'},
    {id:4,designation_id:6,gender:'female',first_name:'minnu'},
    {id:6,designation_id:9,gender:'male',first_name:'junu'},
]

var newEmployees = []
for(var i=0;i<employees;i++){
    console.log(employees[i].first_name);
}
// console.log(newEmployees);