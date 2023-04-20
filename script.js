
let userdetails=[]
window.onload = function() {
   // Load table data from local storage
   displaytable() ;
 };


function submit(){
    
   const Name = document.querySelector('#floatingname').value;
   const email = document.querySelector('#floatingemial').value;
   const phone = document.querySelector('#floatingInput').value;
   const dob = document.querySelector('#floatingdateofbirth').value;
   
  let count=0;
  let age;              


// checking name validation
    if(!Name){
      document.querySelector('#namevalidation').textContent = 'this field is required';
      document.querySelector('#namevalidation').style.display = 'block';
      }
   else if(Name)
   {
      if (Name.length < 3 || Name.length > 20) {
         document.querySelector('#namevalidation').textContent = 'required minimum 3 characters maximum 20 characters';
         document.querySelector('#namevalidation').style.display = 'block';
       }else{
          document.querySelector('#namevalidation').style.display = 'none';
          count+=1
       }
   }

   // cheking email validation
   if(!email) {
      document.querySelector('#emailvalidation').textContent = 'this field is required.';
      document.querySelector('#emailvalidation').style.display = 'block';
   } else {
      
      userdetails=JSON.parse( localStorage.getItem('userdetails'))
      if(userdetails){
      for(let items of userdetails){
            if(email==items.email){
               document.querySelector('#emailvalidation').textContent = 'email already exist';
               document.querySelector('#emailvalidation').style.display = 'block'; 
              
            }else{
               document.querySelector('#emailvalidation').style.display = 'none';
               count+=1
            }
      }
   }else{
      document.querySelector('#emailvalidation').style.display = 'none';
      count+=1
   }
}
   

   // phone number validation
   if(phone&&phone.length<10) {
      document.querySelector('#phonevalidation').textContent = 'Enter a valid phone number.';
      document.querySelector('#phonevalidation').style.display = 'block';
      
   }else{
      document.querySelector('#phonevalidation').style.display = 'none';
      count+=1 
   }
//  age  validation
   if(dob){
      age= checkAge(dob)
     console.log(age);
     if(age<18){
      document.querySelector('#agevalidation').textContent = 'age should be greater than or equal to 18';
      document.querySelector('#agevalidation').style.display = 'block';
      document.querySelector('#ageinput').value=age
      document.querySelector('#ageinput').style.display='block'
     

     }
     else{
      document.querySelector('#agevalidation').style.display = 'none';
      count+=1
         }
      }
   else{
      document.querySelector('#agevalidation').textContent = 'this field is required';
      document.querySelector('#agevalidation').style.display = 'block';
    
       } 
         console.log(count);
         if(count>3){
            resetform() 
            count=0
            addDataToStorage(Name,email, phone, dob,age)
            displaytable()
       }
   }

// function for resetting the form
  
function resetform(){
      document.querySelector('#floatingname').value = '';
      document.querySelector('#floatingemial').value = '';
      document.querySelector('#floatingInput').value = '';
      document.querySelector('#floatingdateofbirth').value = '';
   }






   // function for adding  data to local storage

   function addDataToStorage(Name, email, phone, dob, age) {
      // Retrieve existing data from local storage or create a new array
      let userDetails = JSON.parse(localStorage.getItem('userDetails')) || [];
    
      // Create a new user object
      const newUser = {
        Name: Name,
        email: email,
        phone: phone,
        dob: dob,
        age: age
      };
    
      // Add the new user to the array
      userDetails.push(newUser);
    
      // Convert the array back into a string and save to local storage
      localStorage.setItem('userDetails', JSON.stringify(userDetails));
    
      console.log(userDetails);
    }
    


// function for displaying values into the table

function displaytable(){

   userdetails=JSON.parse( localStorage.getItem('userDetails'))
   console.log(userdetails);
   let counter=0
   let htmldata=''
      for(let items of userdetails){
         counter++
          htmldata+=`<tr>
         <th scope="row">${counter}</th>
         <td>${items.Name}</td>
         <td>${items.email}</td>
         <td>${items.phone}</td>
         <td>${items.dob}</td>
         <td>${items.age}</td>
       </tr>`

         document.querySelector('#tbody').innerHTML=htmldata
      }

}



// function for checking age

function checkAge(dateString) {
   const today = new Date();
   const birthDate = new Date(dateString);
   let age = today.getFullYear() - birthDate.getFullYear();
   const monthDiff = today.getMonth() - birthDate.getMonth();
   
   
   if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
     age--;
   }
   
   return age
   
 }

//  function for  checking the entered mail is unique




