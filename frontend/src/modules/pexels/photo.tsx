import { Photo } from "./_shared"

interface Props {
    id: number
    photo: Photo
}

export default function PhotoCard({ id, photo }: Props) {
    /**
     * Cards for the Pexels-Grid component.
     * @param {number} id    Indexing for the <key> prop.
     * @param {Photo}  photo Object containing the relevant information about the subject <photo>.
    */

    const url = photo.url;
    const title = getTitle(url);

    function getTitle(text: string) {
        /**
         * Extracts the <title> from the <photo>'s <url>.
         * @param {string} text String that should be the <photo>'s url.
         * @return {string} Returns a properly split & capitalized <title>.
        */

        const texts = text.split('/');
        let title = texts.slice(-2, -1)[0];

        const end = title.lastIndexOf('-');
        title = title.slice(0, end);

        let titles = title.split('-');
        titles = titles.map((text) => {
            const start = text[0].toUpperCase();
            const word = start + text.slice(1)
            return word;
        })

        return titles.join(' ');

    }


    return (

        <div key={`card-${id}`} className='relative h-full'>

            <a href={url} title={title} className='w-full h-full'>
                <img src={photo.src.portrait} className='object-contain' />
            </a>

            <span className='
                absolute left-0 bottom-[2%] text-xs
                w-[90%] mx-[5%] my-[5%] px-[3%] py-[2%]
                max-md:hidden bg-black bg-opacity-70
            '>

                <h1 className='text-left'> {title} </h1>

                <p className='text-right'>
                    By:
                    <a href={photo.photographer_url}>
                        <u> {photo.photographer} </u>
                    </a>
                </p>

            </span>

        </div>
    )

}