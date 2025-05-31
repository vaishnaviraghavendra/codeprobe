function GetQuestions(){
    const data = require('./questions.json');
    const new_list = data.members.map((i)=>{
        return {
            id: i.id,
            difficulty: i.difficulty,
            title: i.title  
        };
    })
    return new_list;
}

module.exports=GetQuestions;