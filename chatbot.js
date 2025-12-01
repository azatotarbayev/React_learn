function ChatInput({ chatMessages, setChatMessages })
{
    const [inputText, setInputText] = React.useState();
    
    function saveInputText(event)
    {
        setInputText(event.target.value); // input
    }

    function sendMessage()
    {
        const newChatMessages = [
            ...chatMessages,
            {
                message: inputText,
                sender: 'user',
                id: crypto.randomUUID()
            }
        ];
        setChatMessages(newChatMessages);

        // ответ от чат-бота
        const response = Chatbot.getResponse(inputText);
        
        setChatMessages([
            ...newChatMessages,
            {
                message: response,
                sender: 'robot',
                id: crypto.randomUUID()
            }
        ]);

        setInputText('');
    }

    return (
        <>
            <input 
                placeholder = "Send a message to a chatbot" 
                size = "30" onChange = {saveInputText} value = {inputText}> 
            </input>
            <button onClick = {sendMessage}>Send</button>
        </>
    );
}

// props - object
function ChatMessage({ message, sender })
{
    // const message = props.message;
    // const sender = props.sender;
    // const { message, sender } = props;
    
    // if (sender === "robot")
    // {
    //     return (
    //         <div>
    //             <img src = "assets/robot.png" width = "50"></img>
    //             {message}
    //         </div>
    //     );
    // }

    return (
        <div>
            {sender === "robot" && (<img src = "assets/robot.png" width = "50"></img>)}
            {message}
            {sender === "user" &&(<img src = "assets/user.png" width = "50"></img>)}
        </div>
    );
}

function ChatMessages({ chatMessages, setChatMessages})
{
    // array destructuring
    //const [chatMessages, setChatMessages] = array;
    //const chatMessages = array[0];
    //const setChatMessages = array[1];
    return (
        <>
            {chatMessages.map((chatMessage) =>
                {
                    return (
                        <ChatMessage 
                            message = {chatMessage.message} 
                            sender = {chatMessage.sender}
                            key = {chatMessage.id}
                        />
                    );
                })
            }
        </>
    );
    
}

function App()
{
    // array destructuring
    const [chatMessages, setChatMessages] = React.useState(
        [
            {
                message: "hello chatbot",
                sender: "user",
                id: crypto.randomUUID()
            },
            {
                message: "Hello! How can I help you?",
                sender: "robot",
                id: crypto.randomUUID()
            },
            {
                message: "Can you get me today's date?",
                sender: "user", 
                id: crypto.randomUUID()
            },
            {
                message: "Today is 23.11.",
                sender: "robot",
                id: crypto.randomUUID()
            }
        ]
    );

    return (
        <>
            <ChatInput chatMessages = {chatMessages} setChatMessages = {setChatMessages}/>
            <ChatMessages chatMessages = {chatMessages} setChatMessages = {setChatMessages}/>
        </>
    );
}

const container = document.querySelector('.js-container');
ReactDOM.createRoot(container).render(<App></App>);