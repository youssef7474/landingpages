 user1="YOUSSEF";
 pass1="you";
 user2="MOHAMED";
 pass2="moh";

function getinfo()
{
    var x=document.getElementById("username").value;
    var y=document.getElementById("password").value;
    if(x=="YOUSSEF" && y=="you")
    {
        
       window.open('user.html');
       return false;
    }
    else if(x=="MOHAMED" && y=="moh")
    {
        window.open('admin.html');
        return false;
    }
    else
    {
        alert("wrong");
    }
}

    