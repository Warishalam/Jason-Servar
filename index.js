let container=document.getElementById("container");

async function updateDom(){
    let table=document.createElement("table");

    let thead=document.createElement("thead");

    let theadRow=document.createElement("tr");

    let th1=document.createElement("th");
    th1.textContent="ID";
    let th2=document.createElement("th");
    th2.textContent="NAME";
    let th3=document.createElement("th");
    th3.textContent="AGE";
    let th4=document.createElement("th");
    th4.textContent="GENDER";
    let th5=document.createElement("th");
    th5.textContent="MARK";
    let th6=document.createElement("th");
    th6.textContent="COHORT";
    let th7=document.createElement("th");
    th7.textContent="DELETE";
    let th8=document.createElement("th");
    th8.textContent="Update";

    theadRow.append(th1,th2,th3,th4,th5,th6,th7,th8);
    thead.append(theadRow);


    let res=await fetch(" http://localhost:3000/students");
    let data=await res.json();

    let tbody=document.createElement("tbody");

    data.forEach(student => {
        let {id,name,age,gender,mark,cohort}=student;
        let row=document.createElement("tr");

        let td1=document.createElement("td");
        td1.textContent=id;
        
        let td2=document.createElement("td");
        td2.textContent=name;
        
        let td3=document.createElement("td");
        td3.textContent=age;
        
        let td4=document.createElement("td");
        td4.textContent=gender;
        
        let td5=document.createElement("td");
        td5.textContent=mark;
        
        let td6=document.createElement("td");
        td6.textContent=cohort;
        let td7=document.createElement("td");
        let deleteButton=document.createElement("button");
        deleteButton.textContent="Delete";
        deleteButton.onclick= async function(){
           try {
            let res=await fetch(`http://localhost:3000/students/${id}`,{
                method:"delete"
            });
            // updateDom();
               
           } catch (error) {
               console.log(error, "Delete Error");
           }

           alert("Delete Sucessfull")
        }
        td7.append(deleteButton);

        
        let td8=document.createElement("td");
        let updateButton=document.createElement("button");
        updateButton.textContent="Update";
        updateButton.onclick= async function(){
           try {
               let data= await fetch(`http://localhost:3000/students/${id}`);
               let tempdata=data.json();
            localStorage.setItem("tempData",JSON.stringify(tempdata));

               
           } catch (error) {
               console.log(error, "UPDATE Error");
           }

           alert("Update Sucessfull")
        }
        td8.append(updateButton);

        
        row.append(td1,td2,td3,td4,td5,td6,td7,td8);
        tbody.append(row);

        
        
    });

    table.append(thead,tbody);
    container.append(table);
}

// call update dom function
updateDom();




// update details function
async function updateDetails(){
    try {
        let name=document.querySelector("#name").value;
    let age=+document.querySelector("#age").value;
    let gender=document.querySelector("#gender").value;
    let mark=+document.querySelector("#mark").value;
    let cohort=document.querySelector("#cohort").value;

    let body={
        name,age,gender,mark,cohort
    }

    let res=await fetch(` http://localhost:3000/students`,{
    method:"POST",
    body: JSON.stringify(body),
    headers: {
        "Content-Type" : "application/json"
    }
    });
    alert("New Details Added")
        
    } catch (error) {
        console.log(error);
    }

    
}