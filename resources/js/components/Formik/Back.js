<FormControl
    key={index}
    component="fieldset"
    className={classes.formControl}
>
    <FormLabel
        component="legend"
        className={
            classes.formLabel
        }
        onClick={() =>
            handleToggleOpenGroup(
                position,
            )
        }
    >
        {_.get(
            groupedOpen,
            position,
        ) ? (
            <RemoveRoundedIcon />
        ) : (
            <AddRoundedIcon />
        )}
        {position}
        <Checkbox
            checked={
                values[name] &&
                checker(
                    values[name]
                        .split(',')
                        .map(
                            Number,
                        ),
                    options
                        .filter(
                            (el) =>
                                el.position_name ===
                                position,
                        )
                        .map(
                            (el) =>
                                el.value,
                        ),
                )
            }
            onChange={() =>
                handleCheckAllPosition(
                    position,
                )
            }
        />
    </FormLabel>
    <Collapse
        in={_.get(
            groupedOpen,
            position,
        )}
    >
        <FormGroup>
            {objValues.map(
                (value, i) => (
                    <FormControlLabel
                        key={i}
                        control={
                            <Checkbox
                                checked={
                                    value.checked
                                }
                                onChange={
                                    handleChange
                                }
                                name={
                                    value.checked
                                }
                                value={
                                    value.value
                                }
                            />
                        }
                        label={
                            value.text
                        }
                    />
                ),
            )}
        </FormGroup>
    </Collapse>
</FormControl>