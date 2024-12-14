'use client';

import dynamic from 'next/dynamic';

const FroalaEditorView = dynamic(
  () => import('react-froala-wysiwyg/FroalaEditorView'),
  { ssr: false }
);

interface Props {
  model: string;
}

const FroalaContentView = ({ model }: Props) => {
  return <FroalaEditorView model={model} />;
};

export default FroalaContentView;