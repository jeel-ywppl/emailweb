import PropTypes from 'prop-types';
import { Input, Typography } from "@material-tailwind/react";

const SubjectInput = ({ subject, setSubject }) => {
    return (
        <div className="flex items-center gap-2 ">
            <Typography variant="small" color="blue-gray">
                Subject
            </Typography>
            <Input
                type="text"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="Enter subject"
                className="w-full"
            />
        </div>
    );
};

SubjectInput.propTypes = {
    subject: PropTypes.string.isRequired,
    setSubject: PropTypes.func.isRequired,
};

export default SubjectInput;
