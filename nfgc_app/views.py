from django.shortcuts import render
from django.http import HttpResponse


# Create your views here.


def myView(request):
 
    context = {
                                
    }
    return render( request,'nfgc/home.html',context)
    
    
    
    

   
    







def newView(request):
    return render( request,'nfgc/thatnewnew.html',{})

