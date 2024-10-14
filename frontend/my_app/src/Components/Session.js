import { Popup, Inbox } from '@talkjs/react';
import { useEffect, useState, useCallback } from 'react';
import Talk from 'talkjs';

function Chat({ syncUser }) {
    const { category_name, itemId } = useParams();
    const [item, setItem] = useState(null);
    const [loading, setLoading] = useState(true);
    const [session, setSession] = useState(null); // State to store Talk.js session

  const syncConversation = useCallback((session) => {
    const conversation = session.getOrCreateConversation('new_conversation');

    // Renter
    const other = new Talk.User({
      id: 'frank',
      name: 'Frank',
      email: 'frank@example.com',
      photoUrl: 'https://talkjs.com/new-web/avatar-8.jpg',
      welcomeMessage: 'Hey, how can I help?',
    });

        return () => {
            setItem(null); // Cleanup
            if (session) {
                session.destroy(); // Cleanup session on unmount
            }
        };
    }, [category_name, itemId]);

    // Create Talk.js session when item is loaded
    useEffect(() => {
        if (item) {
            console.log(syncUser);
            if (typeof syncUser === 'function') {
                const newSession = new Talk.Session({
                    appId: process.env.REACT_APP_TALKJS_APP_ID,
                    me: syncUser(), // Pass the synced user here
                });

                setSession(newSession);
            } else {
                console.error('syncUser is not a function');
            }
        }
    }, [item, syncUser]);

    const syncConversation = useCallback((talkSession) => {
        if (!item) {
            console.warn("Item is not yet loaded, skipping conversation creation.");
            return; // Skip if item is not loaded
        }

        // Generate a unique conversation ID based on itemId
        const userId = talkSession.me.id;
        const renterId = item.Renter_id; // Ensure this is the correct field from your item
        const conversationId = `conversation_${userId}_${renterId}`;

        const conversation = talkSession.getOrCreateConversation(conversationId);

        const other = new Talk.User({
            id: item.Renter_id,
            name: item.Renter_name,
            photoUrl: item.Profile_pic,
            welcomeMessage: 'Hello',
        });

        conversation.setParticipant(talkSession.me);
        conversation.setParticipant(other);

        return conversation;
    }, [item, itemId]);

    if (loading) return <div>Loading...</div>; // Optional loading state

    return (
        <Popup
            conversationId={`item_${itemId}`}
            syncConversation={syncConversation} // Pass the current session
        />
    );
}

export default Chat;
