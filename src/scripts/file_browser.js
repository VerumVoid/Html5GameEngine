var currentBrowserFile = null;
var currentEditorFile = null;
function BrowseFile(file){
    currentBrowserFile = file;
    var name = file.getElementsByClassName("file_label")[0].innerHTML
    var content = file.getElementsByClassName("file_content")[0].innerHTML
    var FileBrowser = document.getElementById("file_browser") 
    document.getElementById("file_browser_file_name").innerHTML = name
    document.getElementById("file_browser_file_content_raw").innerHTML = "\"" + content + "\""
}
function FileEditorOpen(file){
    currentEditorFile = file
    var editor = document.getElementById("file_editor")
    if(file == null){
        alert("No file opened")
    }
    else{
        editor.innerHTML = ""
        var content = file.getElementsByClassName("file_content")[0].innerHTML
        content = content.split(".line.")
        for(var i = 0;i < content.length;i++){
            editor.innerHTML += "<div><input type = 'text' value = '"+content[i]+"' class='editor_input' id='editor_input_"+i+"'><span class='editor_input_span'></span><div>"
        }
        renderScriptColorsEditor()
    }
}

function SaveEditorFile(file){
    if(file != null){
        var content = file.getElementsByClassName("file_content")[0]
        var lines = document.getElementsByClassName("editor_input")
        content.innerHTML = ""
        for(var i = 0;i < lines.length;i++){
                content.innerHTML += lines[i].value
                if(lines[i].value != ""){
                    content.innerHTML += ".line."
                }
        }
        BrowseFile(currentEditorFile)
        FileEditorOpen(currentEditorFile)
        renderScriptColorsEditor()
        game.reloadMainFunction(document.getElementById("main.js_file"))
    }
    else{
        alert("no file opened")
    }
}

function renderScriptColorsEditor(){
    var editor = document.getElementById("file_editor")
    var inputs = editor.getElementsByClassName("editor_input")
    var lastFunction = false;
    for(var i = 0;i < inputs.length;i++){
        if(inputs[i].value[0] == "/" && inputs[i].value[0] == "/"){
            inputs[i].style.color = editorColors.commentColor;
        }
        else if(inputs[i].value.substring(0,8) == "function" && lastFunction == false){
            inputs[i].style.color = editorColors.functionColor;
            lastFunction = true;
            
        }
        else if(inputs[i].value[0] == "}" && lastFunction == true){
            inputs[i].style.color = editorColors.functionColor;
            lastFunction = false;
        }
        else if(lastFunction == true){
            inputs[i].style.color = editorColors.functionInsideColor;
        }
        else{
            inputs[i].style.color = editorColors.baseColor;
        }
    }
}

BrowseFile(document.getElementById("main.js_file"))
FileEditorOpen(document.getElementById("main.js_file"))