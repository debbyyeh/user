import { useState } from "react";
import { createCard, generateCardId, UserData } from "../../utils/util";
import { supabase } from "../../config/firebase";
import useCardStore from "../../utils/cardStore";
import './style.css'

export const Popup = () => {
    const isPopupVisible = useCardStore((state) => state.isPopupVisible);
    const [showError, setShowError] = useState<boolean>(false);
    const [uploading, setUploading] = useState(false);
    const addCard = useCardStore((state) => state.addCard);

    const [newUserData, setNewUserData] = useState<UserData>({
            name: '',
            birthDate: '',
            tel: '',
            career: '',
            gender: '不透露',
            isEditing: false,
            profileImage: '',
            id: '',
    });

    const handleImageUpload = async (file: File) => {
        if (!file) return;

        const allowedTypes = ['image/png', 'image/jpeg', 'image/svg+xml'];
        if (!allowedTypes.includes(file.type)) {
            alert('Invalid file type. Please upload a PNG, JPG, or SVG file.');
            return null;
        }
    
        setUploading(true);
        try {
            const fileName = `${Date.now()}-${file.name}`;

            const { data, error } = await supabase.storage
            .from('profile')
            .upload(fileName, file);
            
            const { data: publicUrlData } = supabase.storage.from('profile').getPublicUrl(fileName);

            const publicUrl = publicUrlData?.publicUrl;
        
            setNewUserData((prevData) => ({
            ...prevData,
            profileImage: publicUrl,
            }));

            setUploading(false);

            return publicUrl || null;
        } catch (err) {
            return null;
        }
    };
        
    const handlePopupClose = () => {
        useCardStore.setState({ isPopupVisible: false });
        setNewUserData({
            name: '',
            birthDate: '',
            tel: '',
            career: '',
            gender: '不透露',
            isEditing: false,
            profileImage: '',
            id: '',
        });
        setShowError(false);
    };
        
    const handleSaveNewUser = () => {
        if (
            !newUserData.name ||
            !newUserData.birthDate ||
            !newUserData.tel ||
            !newUserData.career ||
            !newUserData.gender
        ) {
            setShowError(true);
            return;
        }


        const newCard = {
            ...newUserData,
            id: generateCardId(newUserData.birthDate, newUserData.tel),
            profileImage: newUserData.profileImage,
            isEditing: false,
        };

        addCard(newCard);
        createCard(newCard);
        handlePopupClose();
    };


    return(
        isPopupVisible? 
        <div className="popup-overlay">
          <div className="popup">
            <h3 onClick={()=> {
              console.log('Popup clicked');
              useCardStore.setState({ isPopupVisible: true })
            }}>新增人員</h3>
            <div className="popup-content">
              <label>
                姓名：
                <input
                  type="text"
                  value={newUserData.name}
                  onChange={(e) =>
                    setNewUserData({ ...newUserData, name: e.target.value })
                  }
                />
              </label>
              <label>
                生日：
                <input
                  type="date"
                  value={newUserData.birthDate}
                  onChange={(e) =>
                    setNewUserData({ ...newUserData, birthDate: e.target.value })
                  }
                />
              </label>
              <label>
                電話：
                <input
                  type="text"
                  value={newUserData.tel}
                  onChange={(e) =>{
                      const numericValue = e.target.value.replace(/[^0-9]/g, "")
                      setNewUserData({ ...newUserData, tel: e.target.value })
                    }
                  }
                />
              </label>
              <label>
                職業：
                <select
                  value={newUserData.career}
                  onChange={(e) =>
                    setNewUserData({ ...newUserData, career: e.target.value })
                  }
                >
                  <option value="">請選擇</option>
                  <option value="學生">學生</option>
                  <option value="教師">教師</option>
                  <option value="工程師">工程師</option>
                  <option value="無業">無業</option>
                </select>
              </label>
              <label>
                性別：
                <select
                  value={newUserData.gender}
                  onChange={(e) =>
                    setNewUserData({ ...newUserData, gender: e.target.value })
                  }
                >
                  <option value="不透露">不透露</option>
                  <option value="男">男</option>
                  <option value="女">女</option>
                </select>
              </label>
              <label>
                  上傳圖片：
                  <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                      if (e.target.files && e.target.files[0]) {
                          handleImageUpload(e.target.files[0]);
                      }
                  }}
                  />
              </label>
              {uploading ? <p>圖片上傳中...</p>: null}
              {newUserData.profileImage && (
                  <img
                      src={newUserData.profileImage}
                      alt="Profile Preview"
                      style={{ width: "100px", height: "100px", objectFit: "cover" }}
                  />
              )}
            </div>
            <div className="popup-actions">
              {showError ? <p className="error">欄位請勿為空</p> : null}
              {newUserData.tel && !/^\d+$/.test(newUserData.tel) && (
                <p className="error">電話輸入格式錯誤</p>
              )}
              <button onClick={handleSaveNewUser}>保存</button>
              <button onClick={handlePopupClose}>取消</button>
            </div>
          </div>
        </div> : null
    )
}