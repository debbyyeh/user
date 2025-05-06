import { useState } from "react";
import { UserData } from "../../../utils/util";
import { supabase } from "../../../config/firebase";

interface ProfileImageProps {
    card: UserData;
    handleDataChange: (id: string, field: string, value: string) => void;
}

export const ProfileImage = ({card,handleDataChange}: ProfileImageProps) => {

    const [isUploading, setIsUploading] = useState(false)

    return(
        <>
            <div className="profile-image-edit">
                <label htmlFor={`file-input-${card.id}`} className="profile-image-label">
                {card.profileImage ? (
                        <img src={card.profileImage} alt={`${card.name}'s profile`} className="profile-img" />
                    ) : (
                        <div className="placeholder-img">無照片</div>
                    )}
                    {card.isEditing && (
                        <div className="overlay">
                            <span className="edit-text">更換圖片</span>
                        </div>
                    )}
                    </label>
                    <input
                        id={`file-input-${card.id}`}
                        type="file"
                        accept="image/png, image/jpeg, image/svg+xml"
                        style={{ display: 'none' }}
                        onChange={async (e) => {
                            const file = e.target.files?.[0];
                            if (file) {
                                setIsUploading(true);
                                const fileName = `${Date.now()}-${file.name}`;
                                const { data, error } = await supabase.storage
                                    .from('profile')
                                    .upload(fileName, file);

                                if (error) {
                                    console.error('Error uploading file:', error.message);
                                    alert('圖片上傳失敗，請再試一次');
                                    setIsUploading(false);
                                    return;
                                }

                                const { data: publicUrlData } = supabase.storage
                                    .from('profile')
                                    .getPublicUrl(fileName);

                                const publicUrl = publicUrlData?.publicUrl;

                                if (publicUrl) {
                                    handleDataChange(card.id, 'profileImage', publicUrl);
                                }
                                setIsUploading(false);
                            }
                        }}
                    />
                    </div>
            {card.isEditing && isUploading ? <p>圖片更新中...</p>: null}
        </>
    )
}