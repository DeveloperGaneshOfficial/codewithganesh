import Image from 'next/image';
import Link from 'next/link';

import TOCInline from 'pliny/ui/TOCInline'
import Pre from 'pliny/ui/Pre'
import BlogNewsletterForm from 'pliny/ui/BlogNewsletterForm'
import TableWrapper from './TableWrapper'

const CustomLink = (props: any) => {
    const href = props.href;
    if (href.startsWith('/')) {
        return <Link href={href} {...props}>{props.children}</Link>;
    }
    if (href.startsWith('#')) {
        return <a {...props} />;
    }
    return <a target="_blank" rel="noopener noreferrer" {...props} />;
};

export const components = {
    Image,
    TOCInline,
    a: CustomLink,
    pre: Pre,
    table: TableWrapper,
    BlogNewsletterForm,
};

