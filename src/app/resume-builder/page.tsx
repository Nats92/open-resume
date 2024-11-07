"use client";
import React, { useState } from 'react';
import { Provider } from "react-redux";
import { store } from "lib/redux/store";
import { ResumeForm } from "components/ResumeForm";
import { Resume } from "components/Resume";
import { STYLE_TYPE } from '../components/Resume/const';

export default function Create() {
  const [type, setType] = useState(STYLE_TYPE.evrone)

  return (
    <Provider store={store}>
      <main className="relative h-full w-full overflow-hidden bg-gray-50">
        <div className="grid grid-cols-3 md:grid-cols-6">
          <div className="col-span-3">
            <div className="justify-center flex gap-2 mt-2">
              <button className="border rounded py-1 px-3 border-black" type="button" onClick={() => setType(STYLE_TYPE.default)}>Default</button>
              <button className="border rounded py-1 px-3 text-red-600 border-red-600" type="button" onClick={() => setType(STYLE_TYPE.evrone)}>Evrone</button>
            </div>
            <ResumeForm />
          </div>
          <div className="col-span-3">
            <Resume type={type} />
          </div>
        </div>
      </main>
    </Provider>
  );
}
