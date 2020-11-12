// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyBYn9Oa9k4h8rXY3T2JeMXWugdtqzauZ0A",
    authDomain: "lemonerd-2-0.firebaseapp.com",
    databaseURL: "https://lemonerd-2-0.firebaseio.com",
    projectId: "lemonerd-2-0",
    storageBucket: "lemonerd-2-0.appspot.com",
    messagingSenderId: "1040285044928",
    appId: "1:1040285044928:web:bbcdb8f2a57de63b385d25"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);


// To take input from the form

// console.log(firebase);

var database = firebase.database();


var ref = database.ref("Blog")

var ImgName, ImgUrl,imgsrc;
  var files= [];
  var files1=[];
  var reader ;


function select(e)
{

  
  var input =document.createElement('input');
  input.type='file';
  
  
  input.onchange = e =>{
    files =e.target.files;
    reader= new FileReader();
    reader.onload = function()
    {
      document.getElementById("blogimg").src = reader.result;
      document.getElementById("blogimg").style.display="block";

    }
    reader.readAsDataURL(files[0]);
  }
  input.click();
}


function selectedit(e)
{

  
  var input =document.createElement('input');
  input.type='file';
  
  
  input.onchange = e =>{
    files =e.target.files;
    reader= new FileReader();
    reader.onload = function()
    {
      document.getElementById("editimg").src = reader.result;
      

    }
    reader.readAsDataURL(files[0]);
  }
  input.click();
}


function upload()
{
  
  

  let imgname=document.getElementById("postTitle1").value+document.getElementById("postDate1").value;
  
  
 var upload=firebase.storage().ref('Blogimages/'+imgname).put(files[0]);

 upload.on('state_changed' ,function(snapshot){
   var progress = (snapshot.bytesTransferred / snapshot.totalBytes)*100;

   document.getElementById('progress').style.width=progress+"%";
   document.getElementById('progress').textContent=progress+"%";

 }
 ,
 function(error){
   alert('error in saving');
 },

function(){
  upload.snapshot.ref.getDownloadURL().then(function(url){
    ImgUrl=url;
  })
} 
)


}






function writeData() {

 

  database.ref("Blog").push({
    author: document.getElementById("author").value,
    postTitle: document.getElementById("postTitle").value,
    postContent: document.getElementById("postContent").value,
    postDate: document.getElementById("postDate").value,
    img:ImgUrl,
    hidden : 'no',
  })
  alert('New Blog Uploaded')
  window.location.reload();
}






function gotData(data) {
  // console.log(data.val());

  var blog = data.val();
  var keys = Object.keys(blog);
  // console.log(keys);

  for (var i = keys.length - 1; i >= 0; i--) {
    var k = keys[i];
    var author = blog[k].author;
    var blogContent = blog[k].postContent;
    var blogDate = blog[k].postDate;
    var blogTitle = blog[k].postTitle;
    var blogImg = blog[k].img;
    if(blog[k].hidden=="yes")
    {
      continue;
    }


    // console.log(author);
    // console.log(blogTitle);
    // console.log(blogContent);
    // console.log(blogDate);




    var myParent = document.getElementById('allblogs');
   
    var myInnerDiv = document.createElement('div');
    myInnerDiv.setAttribute('class', 'card1 text-dark border-light mb-3');
   
    
    myParent.append(myInnerDiv);


    var innerdiv = document.createElement('div');
    innerdiv.setAttribute('class', 'card-body ');
    myInnerDiv.append(innerdiv);

    var h5 = document.createElement('h5');
    h5.setAttribute('class', 'card-title');
    h5.textContent = blogTitle;
    innerdiv.append(h5);

    var footer = document.createElement('footer');
    footer.setAttribute('class', 'blockquote-footer');
    footer.textContent = blogDate + "  by  " ;
    innerdiv.append(footer);


    var cite = document.createElement('cite');
    cite.setAttribute('title', 'Source Title');
    cite.textContent =  author;
    footer.append(cite);

    var img = new Image(); 
    img.src =  blogImg; 
    img.setAttribute("class","img-fluid");
    // console.log(img.src);
    innerdiv.appendChild(img); 

    var p = document.createElement('p');
    p.setAttribute('class', 'card-text');
    p.textContent = blogContent ;
    innerdiv.append(p);

    // var parent = document.getElementById('blogManage');
    // var innerManage =document.createElement('div');
    // innerManage.setAttribute('class','card border-info mb-3');
    // innerManage.textContent=blogContent;
    // parent.append(innerManage);
  }

}

// database.ref("Blog").on('value', manageData, errData);

function manageData(data){
  var blog = data.val();
  var keys = Object.keys(blog);
  // console.log(keys);
  // console.log(keys.length);

  for (var i = keys.length -1 ; i >=0 ; i--) {
    const k = keys[i];
    var author = blog[k].author;
    var blogContent = blog[k].postContent;
    var blogDate = blog[k].postDate;
    var blogTitle = blog[k].postTitle;
    let blogImg = blog[k].img;

    // console.log(author);
    // console.log(blogTitle);
    // console.log(blogContent);
    // console.log(blogDate);

    var blogManage = document.getElementById('blogManage');

    var child = document.createElement('div');
    child.setAttribute('class','card2 mb-3');
    blogManage.append(child); 

     var child1 = document.createElement('div');
     child1.setAttribute('class','card-body text-dark')
     child.append(child1);


     var child3 = document.createElement('h5');
     child3.setAttribute('class','card-title');
     child3.textContent=blogTitle;
     child1.append(child3);
     
     var child5 = document.createElement('footer');
     child5.setAttribute('class', 'blockquote-footer');
     child5.textContent = blogDate + "  by  " ;
     child1.append(child5);
     
     
     var cit = document.createElement('cite');
     cit.setAttribute('title', 'Source Title');
     cit.textContent =  author;
     child5.append(cit);
     
     let imga = new Image(); 
     console.log(blogImg);
    imga.src =  blogImg; 
    imga.setAttribute("class","img-fluid");
    child1.appendChild(imga); 
     
     var child4 = document.createElement('p');
     child4.setAttribute('class','card-text');
     child4.textContent=blogContent;
     child1.append(child4);

     var child6 = document.createElement('div');
     child6.setAttribute('class','text-center');
     child1.append(child6);

     var btn1 = document.createElement('button');
     btn1.setAttribute('class','btn btn-margin ');
     btn1.setAttribute('type','button');
     btn1.setAttribute('data-toggle','modal');
     btn1.setAttribute('data-target','#editModal');
    
     btn1.textContent=" Edit ";
     btn1.onclick=function(){

     document.getElementById('author1').setAttribute('value',blog[k].author);
     document.getElementById('postTitle1').setAttribute('value',blog[k].postTitle);
     document.getElementById('postContent1').textContent=blog[k].postContent;
     document.getElementById('postDate1').setAttribute('value',blog[k].postDate);
     document.getElementById('editimg').setAttribute('src',blog[k].img);

     var del = document.getElementById('uploadedit');
     del.onclick = function(){
       console.log("hekko");
      let imgname=document.getElementById("postTitle1").value+document.getElementById("postDate1").value;
  
  
      var upload=firebase.storage().ref('Blogimages/'+imgname).put(files[0]);
     
      upload.on('state_changed' ,function(snapshot){
        var progress = (snapshot.bytesTransferred / snapshot.totalBytes)*100;
     
        document.getElementById('progress1').style.width=progress+"%";
        document.getElementById('progress1').textContent=progress+"%";
     
      }
      ,
      function(error){
        alert('error in saving');
      },
     
     function(){
       upload.snapshot.ref.getDownloadURL().then(function(url){
        database.ref("Blog/"+k).update({
         
          img:url,
        })
       })
     } 
     )
       
     }


      document.getElementById('updateblog').onclick=function(){

  database.ref("Blog/"+k).update({
    author: document.getElementById("author1").value ,
    postTitle: document.getElementById("postTitle1").value,
    postContent: document.getElementById("postContent1").value,
    postDate: document.getElementById("postDate1").value,
    
  })

  window.location.reload();
}
     
    }
     child6.append(btn1);

     var btn2 = document.createElement('button');
     btn2.setAttribute('class','btn  btn-margin');
     btn2.setAttribute('data-toggle','modal');
     btn2.setAttribute('data-target','#deleteModal');
     
     btn2.onclick=function(){
     
       
       
       
       
       var model = document.getElementById('deleteModal');

       var modeltitle = document.getElementById('modeltitle');
       modeltitle.textContent=blog[k].postTitle;
       
       var modeltitle = document.getElementById('modelfooter');
       modeltitle.textContent=blog[k].postDate + " by " + blog[k].author;
       var modelimg = document.getElementById('deleteimg');
       modelimg.src=blog[k].img;
       modelimg.setAttribute('class','modalimg')
       var modeltitle = document.getElementById('modelcontent');
       modeltitle.textContent=blog[k].postContent;




       
       
        
        var del = document.getElementById('deleteblg');
        del.onclick = function(){
          console.log(k);
          firebase.database().ref('Blog/' + k).remove();
          window.location.reload();
          
        }
        
    
      
     }
     btn2.textContent="Delete";
     child6.append(btn2);
     var btn3 = document.createElement('button');
     btn3.setAttribute('class','btn  btn-margin');

     btn3.textContent=" Hide ";
     if(blog[k].hidden=="no")
     {
       btn3.onclick=function(){
        database.ref("Blog/"+k).update({
          hidden: "yes",
        })
        window.location.reload();
       }
     }

     if(blog[k].hidden=="yes")
     {
       btn3.textContent=" Unhide ";
       btn3.onclick=function(){
        database.ref("Blog/"+k).update({
          hidden: "no",
        })
        window.location.reload();
       }
     }
     
     child6.append(btn3);




  }
}


function errData(data) {
  console.log('Error!')
  console.log(data);
}



// var login = document.getElementById("cLogin");
// console.log(login);
 function login(){
  
  var username= document.getElementById("loginUsername").value;
  var password = document.getElementById("loginPassword").value;
  if(username=="adminauthor" && password=="authoradmin")
  {
    document.getElementById('correct').style.display="block"
     $('#loginModal').modal('toggle');
$('body').removeClass('modal-open');
$('body').css('padding-right', '0px');
$('.modal-backdrop').remove();
  }
  else{
    document.getElementById('incorrect').style.display="block"
  }

}