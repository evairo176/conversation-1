import { Input } from '@/components/ui/input';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { Button } from './ui/button';

type Props = {
  title: string;
  imageUrls: string[]; // Foto lama dari database
  setImageUrls: (data: string[]) => void;
  initalData: string[];
};

const MultipleImageInput = ({
  title,
  imageUrls,
  setImageUrls,
  initalData
}: Props) => {
  const [newImages, setNewImages] = useState<string[]>([]); // Foto baru yang diunggah
  const [currentImages, setCurrentImages] = useState<string[]>(initalData); // Gunakan initalData sebagai state awal

  useEffect(() => {
    // Jika imageUrls diperbarui dari parent, perbarui currentImages
    if (imageUrls.length > 0) {
      setCurrentImages(imageUrls);
    }
  }, [imageUrls]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files) return;

    const updatedImages: string[] = [];

    Array.from(files).forEach((file) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        if (typeof reader.result === 'string') {
          updatedImages.push(reader.result);
          if (updatedImages.length === files.length) {
            setNewImages(updatedImages); // Simpan foto baru ke state sementara
          }
        }
      };
    });
  };

  const handleUpdateImages = () => {
    if (newImages.length > 0) {
      setImageUrls([...newImages]); // Perbarui state utama di parent
      setCurrentImages([...newImages]); // Perbarui currentImages agar tetap menampilkan gambar baru
      setNewImages([]); // Hapus gambar sementara setelah penyimpanan
    }
  };

  return (
    <div className='overflow-hidden'>
      <h2 className='mb-3 mt-4 text-sm font-medium leading-none'>{title}</h2>

      {/* PREVIEW IMAGE */}
      <div className='grid gap-2'>
        {/* Tampilkan gambar utama: Prioritaskan newImages, jika tidak ada pakai currentImages */}
        {newImages.length > 0 ? (
          <Image
            alt='Product Thumbnail Image'
            className='aspect-square w-full rounded-md object-cover'
            height={300}
            src={newImages[0]}
            width={300}
          />
        ) : currentImages.length > 0 ? (
          <Image
            alt='Product Thumbnail Image'
            className='aspect-square w-full rounded-md object-cover'
            height={300}
            src={currentImages[0]}
            width={300}
          />
        ) : null}

        <div className='grid grid-cols-3 gap-2'>
          {(newImages.length > 0 ? newImages : currentImages).map(
            (item: string, key: number) => (
              <Image
                key={key}
                alt={`Product Image-${key}`}
                className='aspect-square w-full rounded-md object-cover'
                height={84}
                src={item}
                width={84}
              />
            )
          )}
        </div>

        {/* INPUT FILE */}
        <Input
          type='file'
          multiple
          accept='image/*'
          onChange={handleFileChange}
        />

        {/* TOMBOL SIMPAN */}
        {newImages.length > 0 && (
          <Button variant={'secondary'} onClick={handleUpdateImages}>
            Simpan Perubahan foto
          </Button>
        )}
      </div>
    </div>
  );
};

export default MultipleImageInput;
