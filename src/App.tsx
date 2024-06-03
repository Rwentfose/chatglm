import { ProChat } from '@ant-design/pro-chat';
import { useTheme } from 'antd-style';
import axios from "axios";
import {useEffect, useState} from "react";
function App() {
    const theme = useTheme();
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [showComponent, setShowComponent] = useState(false)
    const [cachedChats, setCachedChats] = useState(null);
    useEffect(() => setShowComponent(true), [])
    useEffect(() => {
        const cachedData = localStorage.getItem('chats');
        if (cachedData) {
            setCachedChats(JSON.parse(cachedData));
        }
    }, []);
    return (
        <div style={{ background: theme.colorBgLayout }}>
            { showComponent && <ProChat
                style={{
                    height: '100vh',
                    width: '100vw',
                }}
                locale="en-US"
                 request={ async (messages) => {
                   const res =   await axios.post('/api',{
                          prompt:messages[messages.length-1].content
                      })
                    return new Response(res.data.response);
                }}
                helloMessage={'你好，有什么可以帮助你的吗？'}
                // @ts-ignore
                initialChats={cachedChats}
                onChatsChange={(chats) => {
                    localStorage.setItem(
                        'chats',
                        JSON.stringify({
                            ...chats,
                        }),
                    );
                }}
            /> }
        </div>
    );
}

export default App
